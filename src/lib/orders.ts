import "server-only";
import { books } from "@/data";

export type OrderStatus =
  | "Pending"
  | "Paid"
  | "Shipped"
  | "Delivered"
  | "Failed";

export type OrderLine = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  lineTotal: number;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
};

export type Order = {
  id: string;
  customer: Customer;
  items: OrderLine[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  paymentReference?: string;
};

const orders = new Map<string, Order>();
const inventory = new Map(books.map((book) => [book.id, book.stock]));

// The below function helps fetch the available stock for a specific product by its ID.
export function getAvailableStock(productId: string) {
  return inventory.get(productId) ?? 0;
}

// The below function helps create a new order and store it in the orders map.
export function createStoredOrder(order: Order) {
  for (const item of order.items) {
    const available = getAvailableStock(item.productId);
    if (item.quantity > available) return false;
  }
  for (const item of order.items)
    inventory.set(
      item.productId,
      getAvailableStock(item.productId) - item.quantity,
    );
  orders.set(order.id, order);
  return true;
}

// The below function helps fetch a specific order by its ID.
export function getOrder(id: string) {
  return orders.get(id) ?? null;
}

// The below function helps fetch all orders according to their 
// date.
export function getOrders() {
  return [...orders.values()].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

// The below function helps update an item in the orders map by 
// applying a provided update function to it.
export function updateOrder(id: string, update: (order: Order) => Order) {
  const current = orders.get(id);
  if (!current) return null;
  const next = update(current);
  orders.set(id, next);
  return next;
}

// The below function helps release the stock of an order back to the inventory.
export function releaseOrderStock(order: Order) {
  for (const item of order.items)
    inventory.set(
      item.productId,
      getAvailableStock(item.productId) + item.quantity,
    );
}
