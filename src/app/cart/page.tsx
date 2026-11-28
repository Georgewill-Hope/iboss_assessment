import CheckoutPanel from "@/components/checkout-panel";

export default function CartPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-12 md:px-10 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-[#bd5c3d]">
        Your next chapter
      </p>
      <h1 className="mt-3 font-serif text-5xl">Checkout</h1>

      <CheckoutPanel />
    </main>
  );
}
