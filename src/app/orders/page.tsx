import CustomerOrderLookup from "@/components/customer-order-lookup";

export default function OrdersPage() {
  return <main className="mx-auto min-h-screen max-w-4xl px-5 py-12 md:px-10 md:py-20"><p className="text-xs uppercase tracking-[0.2em] text-[#bd5c3d]">Customer order lookup</p><h1 className="mt-3 font-serif text-5xl">Your orders</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-[#73796f]">Enter the email used at checkout and the full order reference shown on the receipt. You can look up multiple orders in this session.</p><CustomerOrderLookup /></main>;
}
