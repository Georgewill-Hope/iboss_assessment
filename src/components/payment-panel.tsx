"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { simulatePayment } from "@/actions/orders";

export default function PaymentPanel({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function pay(outcome: "success" | "failure") {
    setPending(true);
    setError("");
    const result = await simulatePayment(orderId, outcome);
    setPending(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.refresh();
  }
  return (
    <div className="mt-6 rounded-xl border border-[#dfdfd5] bg-[#f7f6f0] p-5">
      <p className="text-sm font-semibold">Test payment</p>
      <p className="mt-1 text-xs leading-5 text-[#73796f]">
        Choose a simulated provider result. No card details or real payment are
        involved.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          className="rounded-sm bg-[#27372d] px-4 py-3 text-xs text-white disabled:opacity-60"
          disabled={pending}
          onClick={() => pay("success")}
          type="button"
        >
          {pending ? "Processing…" : "Simulate successful payment"}
        </button>
        <button
          className="rounded-sm border border-[#bd5c3d] px-4 py-3 text-xs text-[#bd5c3d] disabled:opacity-60"
          disabled={pending}
          onClick={() => pay("failure")}
          type="button"
        >
          Simulate failed payment
        </button>
      </div>
      {error && (
        <p aria-live="polite" className="mt-3 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
