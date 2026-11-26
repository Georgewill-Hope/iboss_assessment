"use client";

import { useCartStore } from "@/store/cart-store";

export default function AddToCartButton({ id, unavailable }: { id: string; unavailable: boolean }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <button
      className="rounded-full bg-[#27372d] px-4 py-2 text-[11px] font-medium text-white transition-colors hover:bg-[#3a5142] disabled:cursor-not-allowed disabled:bg-[#a6aaa1]"
      disabled={unavailable}
      onClick={() => addItem(id)}
      type="button"
    >
      {unavailable ? "Out of stock" : "Add to cart"}
    </button>
  );
}
