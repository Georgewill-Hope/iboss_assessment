import Link from "next/link";
import { Suspense } from "react";
import { loadOrder } from "@/actions/orders";
import PaymentPanel from "@/components/payment-panel";

const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function ReceiptPage({
  params,
}: PageProps<"/orders/[orderId]">) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto min-h-screen max-w-3xl px-5 py-16">
          <p className="text-sm text-[#73796f]">Loading your receipt…</p>
        </main>
      }
    >
      <ReceiptContent params={params} />
    </Suspense>
  );
}

async function ReceiptContent({
  params,
}: {
  params: PageProps<"/orders/[orderId]">["params"];
}) {
  const { orderId } = await params;
  const order = await loadOrder(orderId);
  if (!order)
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-5 py-16">
        <h1 className="font-serif text-4xl">Order not found</h1>
        <p className="mt-3 text-sm text-[#73796f]">
          This order may have expired when the server restarted.
        </p>
        <Link className="mt-6 inline-block text-[#bd5c3d] underline" href="/">
          Return to the bookshop
        </Link>
      </main>
    );
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-[#bd5c3d]">
        Order receipt
      </p>
      <h1 className="mt-3 font-serif text-5xl">
        Thank you, {order.customer.name.split(" ")[0]}.
      </h1>
      <p className="mt-4 text-sm leading-6 text-[#73796f]">
        Order{" "}
        <span className="font-mono">{order.id.slice(0, 8).toUpperCase()}</span>{" "}
        was created on {new Date(order.createdAt).toLocaleString("en-NG")}.
      </p>
      <p className="mt-2 break-all text-xs text-[#73796f]">
        Save your full order reference to look it up later:{" "}
        <span className="font-mono">{order.id}</span>
      </p>
      <section className="mt-8 rounded-2xl border border-[#dfdfd5] bg-[#fffdf8] p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">Status</h2>
          <span className="rounded-full bg-[#e9eee5] px-3 py-1 text-xs">
            {order.status}
          </span>
        </div>
        <ul className="mt-5 divide-y divide-[#e8e5da]">
          {order.items.map((item) => (
            <li
              className="flex justify-between gap-4 py-4 text-sm"
              key={item.productId}
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{money(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-[#dfdfd5] pt-5 font-semibold">
          <span>Total</span>
          <span>{money(order.total)}</span>
        </div>
        <div className="mt-5 border-t border-[#dfdfd5] pt-5 text-sm">
          <p className="font-semibold">Delivering to</p>
          <p className="mt-1 leading-6 text-[#73796f]">
            {order.customer.name}
            <br />
            {order.customer.phone}
            <br />
            {order.customer.address}
            <br />
            {order.customer.city}, {order.customer.state}{" "}
            {order.customer.postalCode}
          </p>
        </div>
        {order.paymentReference && (
          <p className="mt-4 text-xs text-[#73796f]">
            Test payment reference: {order.paymentReference}
          </p>
        )}
      </section>
      {order.status === "Pending" && <PaymentPanel orderId={order.id} />}
      {order.status === "Failed" && (
        <div className="mt-6 rounded-xl bg-[#f8ebe6] p-5">
          <p className="font-semibold">Payment was not completed</p>
          <p className="mt-1 text-sm text-[#73796f]">
            Your reserved books have been returned to stock. Place a new order
            to try again.
          </p>
          <Link
            className="mt-3 inline-block text-sm text-[#bd5c3d] underline"
            href="/"
          >
            Browse books
          </Link>
        </div>
      )}
      {order.status === "Paid" && (
        <p className="mt-6 rounded-xl bg-[#e9eee5] p-5 text-sm">
          Payment confirmed. Your order is being prepared.
        </p>
      )}
      <Link
        className="mt-8 inline-block text-sm text-[#bd5c3d] underline"
        href="/orders"
      >
        Look up your orders
      </Link>
    </main>
  );
}
