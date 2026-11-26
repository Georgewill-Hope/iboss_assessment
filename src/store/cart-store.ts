import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { books } from "@/data";

type CartItem = { productId: string; quantity: number };

type CartStore = {
  items: CartItem[];
  addItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId) =>
        set((state) => {
          const book = books.find((item) => item.id === productId);
          if (!book || book.stock < 1) return state;
          const existing = state.items.find((item) => item.productId === productId);
          if (existing) {
            return { items: state.items.map((item) => item.productId === productId
              ? { ...item, quantity: Math.min(item.quantity + 1, book.stock) }
              : item) };
          }
          return { items: [...state.items, { productId, quantity: 1 }] };
        }),
      setQuantity: (productId, quantity) =>
        set((state) => {
          const book = books.find((item) => item.id === productId);
          if (!book || !Number.isInteger(quantity) || quantity < 1) {
            return { items: state.items.filter((item) => item.productId !== productId) };
          }
          return { items: state.items.map((item) => item.productId === productId
            ? { ...item, quantity: Math.min(quantity, book.stock) }
            : item) };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
    }),
    {
      name: "nook-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      merge: (saved, current) => {
        const savedItems = (saved as Partial<CartStore> | undefined)?.items;
        const items = Array.isArray(savedItems) ? savedItems.flatMap((item) => {
          const book = books.find((product) => product.id === item?.productId);
          if (!book || book.stock < 1 || !Number.isInteger(item.quantity) || item.quantity < 1) return [];
          return [{ productId: book.id, quantity: Math.min(item.quantity, book.stock) }];
        }) : [];
        return { ...current, items };
      },
    },
  ),
);
