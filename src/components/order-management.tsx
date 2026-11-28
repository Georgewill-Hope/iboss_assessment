"use client";

import { useState } from "react";
import Link from "next/link";
import { updateFulfillment } from "@/actions/orders";
import { useAuthStore } from "@/store/auth-store";
import type { Order, OrderStatus } from "@/lib/orders";

const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
const statuses: OrderStatus[] = [
  "Pending",
  "Paid",
  "Shipped",
  "Delivered",
  "Failed",
];

export default function OrderManagement({
  initialOrders,
}: {
  initialOrders: Order[];
}) {
  const username = useAuthStore((state) => state.username);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");
  const visible =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  async function advance(order: Order, status: "Shipped" | "Delivered") {
    setMessage("");
    if (!isAuthenticated) {
      setMessage("Please sign in as an admin to update orders.");
      return;
    }
    const result = await updateFulfillment(order.id, status, username, "12345");
    if (!result.success) {
      setMessage(result.error);
      return;
    }
    setOrders((current) =>
      current.map((item) =>
        item.id === order.id ? { ...item, status: result.data.status } : item,
      ),
    );
  }

  return (
    <>
      <label className="mt-8 block text-sm" htmlFor="status-filter">
        Filter orders by status
      </label>
      <select
        className="mt-2 rounded-md border border-[#d7d8cc] bg-white px-3 py-2 text-sm"
        id="status-filter"
        onChange={(event) => setFilter(event.target.value)}
        value={filter}
      >
        <option>All</option>
        {statuses.map((status) => (
          <option key={status}>{status}</option>
        ))}
      </select>
      {message && (
        <p aria-live="polite" className="mt-3 text-sm text-red-800">
          {message}
        </p>
      )}
      {visible.length === 0 ? (
        <p className="mt-8 rounded-xl border border-[#dfdfd5] bg-[#fffdf8] p-6 text-sm text-[#73796f]">
          No orders match this filter.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((order) => (
            <li
              className="rounded-xl border border-[#dfdfd5] bg-[#fffdf8] p-5"
              key={order.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <Link
                    className="font-mono text-sm text-[#bd5c3d] underline"
                    href={`/admin/orders/${order.id}`}
                  >
                    Order {order.id.slice(0, 8).toUpperCase()}
                  </Link>
                  <p className="mt-2 text-sm">
                    {order.customer.name} · {order.customer.email}
                  </p>
                  <p className="mt-1 text-xs text-[#73796f]">
                    {new Date(order.createdAt).toLocaleString("en-NG")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{money(order.total)}</p>
                  <p className="mt-1 text-xs">{order.status}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#73796f]">
                {order.items
                  .map((item) => `${item.name} × ${item.quantity}`)
                  .join(", ")}
              </p>
              {order.status === "Paid" && (
                <button
                  className="mt-4 rounded-sm bg-[#27372d] px-4 py-2 text-xs text-white"
                  onClick={() => advance(order, "Shipped")}
                  type="button"
                >
                  Mark shipped
                </button>
              )}
              {order.status === "Shipped" && (
                <button
                  className="mt-4 rounded-sm bg-[#27372d] px-4 py-2 text-xs text-white"
                  onClick={() => advance(order, "Delivered")}
                  type="button"
                >
                  Mark delivered
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
