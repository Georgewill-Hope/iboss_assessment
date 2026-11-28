"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadAdminOrder } from "@/actions/orders";
import Loader from "@/components/loader";
import { useAuthStore } from "@/store/auth-store";
import type { Order } from "@/lib/orders";

const adminPassword = "12345";
const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function AdminOrderReceiptClientPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const username = useAuthStore((state) => state.username);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    if (!hasHydrated || !isAuthenticated) return;
    let active = true;
    loadAdminOrder(orderId, username, adminPassword).then((result) => {
      if (active) setOrder(result);
    });
    return () => {
      active = false;
    };
  }, [hasHydrated, isAuthenticated, orderId, username]);

  if (!hasHydrated || !isAuthenticated || order === undefined)
    return <Loader />;
  if (!order)
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-5 py-16">
        <h1 className="font-serif text-4xl">Order not found</h1>
        <Link
          className="mt-6 inline-block text-sm text-[#bd5c3d] underline"
          href="/admin/orders"
        >
          Back to orders
        </Link>
      </main>
    );

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12 md:py-20">
      <Link className="text-sm text-[#bd5c3d] underline" href="/admin/orders">
        ← Back to orders
      </Link>
      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#bd5c3d]">
        Admin receipt
      </p>
      <h1 className="mt-3 font-serif text-4xl">
        Order {order.id.slice(0, 8).toUpperCase()}
      </h1>
      <p className="mt-3 break-all font-mono text-xs text-[#73796f]">
        {order.id}
      </p>
      <section className="mt-7 rounded-2xl border border-[#dfdfd5] bg-[#fffdf8] p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">{order.status}</h2>
          <span className="text-sm">
            {new Date(order.createdAt).toLocaleString("en-NG")}
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
          <p className="font-semibold">Customer</p>
          <p className="mt-1 leading-6 text-[#73796f]">
            {order.customer.name}
            <br />
            {order.customer.email}
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
            Payment reference: {order.paymentReference}
          </p>
        )}
      </section>
    </main>
  );
}
