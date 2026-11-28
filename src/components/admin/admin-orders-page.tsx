"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadOrders } from "@/actions/orders";
import OrderManagement from "@/components/order-management";
import Loader from "@/components/loader";
import { useAuthStore } from "@/store/auth-store";
import type { Order } from "@/lib/orders";

const adminPassword = "12345";

export default function AdminOrdersClientPage() {
  const username = useAuthStore((state) => state.username);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasHydrated || !isAuthenticated) return;
    let active = true;
    loadOrders(username, adminPassword).then(
      (result) => {
        if (active) setOrders(result);
      },
      () => {
        if (active) setError("Could not load orders. Please try again.");
      },
    );
    return () => {
      active = false;
    };
  }, [hasHydrated, isAuthenticated, username]);

  if (!hasHydrated || !isAuthenticated) return <Loader />;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-12 md:px-10 md:py-20">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#bd5c3d]">
            Admin workspace
          </p>
          <h1 className="mt-3 font-serif text-5xl">Customer orders</h1>
          <p className="mt-3 text-sm text-[#73796f]">
            Review orders and update fulfillment status.
          </p>
        </div>
        <button
          className="rounded-sm border border-[#b5b9ad] px-4 py-3 text-xs"
          onClick={logout}
          type="button"
        >
          Sign out
        </button>
      </div>
      {error && (
        <p aria-live="polite" className="mt-6 text-sm text-red-800">
          {error}
        </p>
      )}
      {orders === null ? (
        <p className="mt-8 text-sm text-[#73796f]">Loading orders…</p>
      ) : orders.length > 0 ? (
        <OrderManagement initialOrders={orders} />
      ) : (
        <section className="mt-8 rounded-xl border border-[#dfdfd5] bg-[#fffdf8] p-6">
          <p className="text-sm text-[#73796f]">No customer orders yet.</p>
          <Link
            className="mt-4 inline-block text-sm text-[#bd5c3d] underline"
            href="/"
          >
            Return to the bookshop
          </Link>
        </section>
      )}
    </main>
  );
}
