"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { books } from "@/data";
import {
  createStoredOrder,
  getOrder,
  getOrders,
  releaseOrderStock,
  updateOrder,
  type Order,
  type OrderStatus,
} from "@/lib/orders";

// The below function helps check if the admin credentials are valid
const hasAdminCredentials = (username: unknown, password: unknown) =>
  username === "Admin" && password === "12345";


const customerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name.").max(100),
    email: z.string().trim().email("Enter a valid email address.").max(254),
    phone: z
      .string()
      .trim()
      .min(7, "Enter a valid phone number.")
      .max(20, "Enter a valid phone number.")
      .regex(/^[+()\d\s-]+$/, "Enter a valid phone number."),
    address: z.string().trim().min(5, "Enter a delivery address.").max(200),
    city: z.string().trim().min(2, "Enter your city.").max(100),
    state: z.string().trim().min(2, "Enter your state.").max(100),
    postalCode: z.string().trim().min(3, "Enter your postal code.").max(20),
  })
  .strict();
const itemSchema = z
  .object({
    productId: z.string().min(1),
    quantity: z.number().int().min(1).max(100),
  })
  .strict();
const checkoutSchema = z
  .object({
    customer: customerSchema,
    items: z.array(itemSchema).min(1).max(books.length),
  })
  .strict()
  .refine(
    ({ items }) =>
      new Set(items.map((item) => item.productId)).size === items.length,
    { message: "A book can only appear once in your cart." },
  );

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
const failure = <T>(error: string): ActionResult<T> => ({
  success: false,
  error,
});

// A local test-provider stand-in. The selected scenario controls only this mock;
// order state is changed only after its response is checked below.
function mockPaymentProvider(order: Order, scenario: "success" | "failure") {
  return {
    orderId: order.id,
    amount: order.total,
    result:
      scenario === "success" ? ("approved" as const) : ("declined" as const),
    reference: `TEST-${randomUUID().slice(0, 8).toUpperCase()}`,
  };
}

// The below function helps create an order and store it in 
// the orders map
export async function createOrder(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  // Checking if every value needed for checkout is available 
  // and valid, if not a failure message is returned
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success)
    return failure(
      parsed.error.issues[0]?.message ?? "Check your details and cart.",
    );

  const lines = [];
  let total = 0;
  for (const item of parsed.data.items) {
    // Checking if every book in the cart could be actually
    // found in our local database
    const book = books.find((entry) => entry.id === item.productId);
    if (!book) return failure("A book in your cart could not be found.");

    // Calculating the line total for each book in the cart 
    // and checking if the total is safe to use
    const lineTotal = book.price * item.quantity;
    if (
      !Number.isSafeInteger(lineTotal) ||
      !Number.isSafeInteger(total + lineTotal)
    )
      return failure("Your order total is too large.");
    lines.push({
      productId: book.id,
      name: book.name,
      quantity: item.quantity,
      price: book.price,
      lineTotal,
    });
    total += lineTotal;
  }

  // Creating the order object with a unique ID. If the order 
  // cannot be created due to insufficient stock, a failure 
  // message is returned. Otherwise, the order ID is returned 
  // as a success response.
  const order: Order = {
    id: randomUUID(),
    customer: parsed.data.customer,
    items: lines,
    total,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  if (!createStoredOrder(order))
    return failure(
      "Some books in your cart are no longer available in the requested quantity.",
    );
  return { success: true, data: { id: order.id } };
}

export async function simulatePayment(
  orderId: string,
  outcome: "success" | "failure",
): Promise<ActionResult<{ status: OrderStatus }>> {
  if (
    typeof orderId !== "string" ||
    !/^[0-9a-f-]{36}$/i.test(orderId) ||
    !["success", "failure"].includes(outcome)
  )
    return failure("Invalid payment request.");
  const current = getOrder(orderId);
  if (!current) return failure("Order not found.");
  if (current.status !== "Pending")
    return failure("This order has already received a payment result.");
  const providerResult = mockPaymentProvider(current, outcome);
  if (
    providerResult.orderId !== current.id ||
    providerResult.amount !== current.total ||
    !/^TEST-[A-F0-9]{8}$/.test(providerResult.reference) ||
    !["approved", "declined"].includes(providerResult.result)
  )
    return failure("The simulated payment result could not be verified.");
  const next = updateOrder(orderId, (order) => ({
    ...order,
    status: providerResult.result === "approved" ? "Paid" : "Failed",
    paymentReference: providerResult.reference,
  }));
  if (!next) return failure("Order not found.");
  if (next.status === "Failed") releaseOrderStock(next);
  return { success: true, data: { status: next.status } };
}

// This function fetchs a particular order
export async function loadOrder(orderId: string) {
  if (typeof orderId !== "string" || !/^[0-9a-f-]{36}$/i.test(orderId))
    return null;
  return getOrder(orderId);
}

// This function fetchs every customers orders in the admin dashboard
export async function loadOrders(username: string, password: string) {
  // An empty array would be returned if your admin credentials does not
  // match {username: "Admin", password: "12345"}
  if (!hasAdminCredentials(username, password)) return [];
  return getOrders();
}

// The function below helps fetch a customer's order in 
// the admin dashboard
export async function loadAdminOrder(
  orderId: string,
  username: string,
  password: string,
) {
  if (
    !hasAdminCredentials(username, password) ||
    typeof orderId !== "string" ||
    !/^[0-9a-f-]{36}$/i.test(orderId)
  )
    return null;
  return getOrder(orderId);
}

// The below function helps a fetch a particular customers orders
export async function findCustomerOrder(
  orderIdInput: unknown,
  emailInput: unknown,
): Promise<ActionResult<Order>> {
  // checking if orderId and email entered by the customer is a string and valid
  if (typeof orderIdInput !== "string" || typeof emailInput !== "string")
    return failure("Enter your order reference and checkout email.");
  const orderId = orderIdInput.trim();
  const email = emailInput.trim().toLowerCase();
  if (!/^[0-9a-f-]{36}$/i.test(orderId) || !z.email().safeParse(email).success)
    return failure("Enter a valid order reference and checkout email.");
  const order = getOrder(orderId);
  // checking if there is an order with the inputed orderId and eamil 
  if (!order || order.customer.email.toLowerCase() !== email)
    return failure("We could not find an order matching those details.");
  return { success: true, data: order };
}

// The function below helps update order
// status only if it has been paid for
export async function updateFulfillment(
  orderId: string,
  nextStatus: "Shipped" | "Delivered",
  username: string,
  password: string,
): Promise<ActionResult<{ status: OrderStatus }>> {
  // Checking for credentials
  if (!hasAdminCredentials(username, password))
    return failure("Admin sign-in is required to update orders.");

  // Checking of order ID is a string
  // Moreover order status can only be updated to shipped or delivered
  if (
    typeof orderId !== "string" ||
    !["Shipped", "Delivered"].includes(nextStatus)
  )
    return failure("Invalid fulfillment update.");

  // Checking if an order exist
  const order = getOrder(orderId);
  if (!order) return failure("Order not found.");

  // Paid status can only be updated to shipped
  // Shipped can only be updated to delivered
  const allowed =
    (order.status === "Paid" && nextStatus === "Shipped") ||
    (order.status === "Shipped" && nextStatus === "Delivered");

  // if order has not been paid for it's status cannot be updated
  if (!allowed)
    return failure(
      "Only paid orders can be shipped, and only shipped orders can be delivered.",
    );

  // if all the above check passes, the order can be updated
  const updated = updateOrder(orderId, (current) => ({
    ...current,
    status: nextStatus,
  }));
  return updated
    ? { success: true, data: { status: updated.status } }
    : failure("Order not found.");
}
