"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { findCustomerOrder } from "@/actions/orders";
import type { Order } from "@/lib/orders";

const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function CustomerOrderLookup() {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const result = await findCustomerOrder(reference, email);
    setPending(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setOrders((current) =>
      current.some((order) => order.id === result.data.id)
        ? current
        : [result.data, ...current],
    );
    setReference("");
  }

  return (
    <>
      <form
        className="mt-8 grid gap-5 rounded-2xl border border-[#dfdfd5] bg-[#fffdf8] p-6 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="text-sm" htmlFor="lookup-email">
            Email used at checkout
          </label>
          <input
            autoComplete="email"
            className="mt-2 w-full rounded-md border border-[#d7d8cc] bg-white px-3 py-3 text-sm"
            id="lookup-email"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
          />
        </div>
        <div>
          <label className="text-sm" htmlFor="order-reference">
            Full order reference
          </label>
          <input
            autoComplete="off"
            className="mt-2 w-full rounded-md border border-[#d7d8cc] bg-white px-3 py-3 font-mono text-sm"
            id="order-reference"
            onChange={(e) => setReference(e.target.value)}
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            required
            value={reference}
          />
        </div>
        <button
          className="bg-[#27372d] px-5 py-3 text-sm text-white disabled:opacity-60 md:col-span-2"
          disabled={pending}
        >
          {pending ? "Looking up…" : "Find my order"}
        </button>
        {error && (
          <p aria-live="polite" className="text-sm text-red-800 md:col-span-2">
            {error}
          </p>
        )}
      </form>
      {orders.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-3xl">Your orders</h2>
          <ul className="mt-5 space-y-4">
            {orders.map((order) => (
              <li
                className="rounded-2xl border border-[#dfdfd5] bg-[#fffdf8] p-6"
                key={order.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#73796f]">
                      Order reference
                    </p>
                    <p className="mt-1 break-all font-mono text-sm">
                      {order.id}
                    </p>
                    <p className="mt-2 text-xs text-[#73796f]">
                      Placed {new Date(order.createdAt).toLocaleString("en-NG")}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#e9eee5] px-3 py-1 text-xs">
                    {order.status}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl">Items</h3>
                <ul className="mt-2 divide-y divide-[#e8e5da]">
                  {order.items.map((item) => (
                    <li
                      className="flex justify-between gap-4 py-3 text-sm"
                      key={item.productId}
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{money(item.lineTotal)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between border-t border-[#dfdfd5] pt-4 text-sm font-semibold">
                  <span>Order total</span>
                  <span>{money(order.total)}</span>
                </div>
                <Link
                  className="mt-5 inline-block text-sm text-[#bd5c3d] underline"
                  href={`/orders/${order.id}`}
                >
                  View receipt
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
