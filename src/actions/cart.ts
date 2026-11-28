"use server";

import { books } from "@/data";
import { getAvailableStock } from "@/lib/orders";
import { z } from "zod";

type CartLine = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  lineTotal: number;
};

type CartResult =
  | {
      success: true;
      data: {
        lines: CartLine[];
        total: number;
        totalItems: number;
      };
    }
  | {
      success: false;
      error: string;
    };

const cartItemSchema = z.object({
  productId: z.string().trim().min(1, "Choose a book to add to your cart."),
  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1.")
    .max(100, "You cannot purchase more than  copies."),
}).strict();

const cartSchema = z.object({
  items: z
    .array(cartItemSchema)
    .min(1, "Your cart is empty.")
    .max(books.length, "Your cart has too many items."),
}).strict().refine(
  ({ items }) => new Set(items.map((item) => item.productId)).size === items.length,
  {
    path: ["items"],
    message: "A book can only appear once in your cart.",
  },
);

export async function validateCart(input: unknown): Promise<CartResult> {
  const validation = cartSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      error:
        validation.error.issues[0]?.message ??
        "Your cart has invalid items.",
    };
  }

  const { items } = validation.data;
  const bookMap = new Map(books.map((book) => [book.id, book]));
  const lines: CartLine[] = [];
  let total = 0;
  let totalItems = 0;

  for (const item of items) {
    const book = bookMap.get(item.productId);

    if (!book) {
      return {
        success: false,
        error: "A book in your cart could not be found.",
      };
    }

    if (
      !Number.isSafeInteger(book.stock) ||
      book.stock < 0 ||
      !Number.isSafeInteger(book.price) ||
      book.price < 0
    ) {
      console.error("Invalid book data:", book.id);
      return {
        success: false,
        error: "A book has invalid price or stock information.",
      };
    }

    const availableStock = getAvailableStock(book.id);
    if (item.quantity > availableStock) {
      return {
        success: false,
        error: `${book.name} has only ${availableStock} in stock.`,
      };
    }

    const lineTotal = book.price * item.quantity;
    if (
      !Number.isSafeInteger(lineTotal) ||
      !Number.isSafeInteger(total + lineTotal) ||
      !Number.isSafeInteger(totalItems + item.quantity)
    ) {
      return {
        success: false,
        error: "Your cart total is too large.",
      };
    }

    lines.push({
      productId: book.id,
      name: book.name,
      quantity: item.quantity,
      price: book.price,
      lineTotal,
    });

    total += lineTotal;
    totalItems += item.quantity;
  }

  return {
    success: true,
    data: {
      lines,
      total,
      totalItems,
    },
  };
}
