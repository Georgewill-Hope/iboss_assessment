"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { books } from "@/data";
import { createOrder } from "@/actions/orders";
import { useCartStore } from "@/store/cart-store";
import CustomInput from "./custom-input";

const money = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function CheckoutPanel() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const [ready, setReady] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    useCartStore.persist.rehydrate().finally(() => setReady(true));
  }, []);

  
  const lines = useMemo(
    () =>
      items.flatMap((item) => {
        const book = books.find((entry) => entry.id === item.productId);
        return book ? [{ ...item, book }] : [];
      }),
    [items],
  );
  const subtotal = lines.reduce(
    (sum, line) => sum + line.book.price * line.quantity,
    0,
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const result = await createOrder({
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      },
      items: items.map(({ productId, quantity }) => ({ productId, quantity })),
    });
    setPending(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    items.forEach((item) => removeItem(item.productId));
    router.push(`/orders/${result.data.id}`);
  }

  if (!ready)
    return <p className="mt-10 text-sm text-[#73796f]">Loading your cart…</p>;


  if (lines.length === 0)
    return (
      <section className="mt-10 rounded-2xl border border-[#dfdfd5] bg-[#fffdf8] p-8">
        <h2 className="font-serif text-2xl">Your cart is empty</h2>
        <p className="mt-2 text-sm text-[#73796f]">
          Browse the shelves and add a book before checkout.
        </p>
        <Link
          className="mt-5 inline-block text-sm text-[#bd5c3d] underline"
          href="/#collections"
        >
          Browse books
        </Link>
      </section>
    );

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
      <form className="space-y-5" onSubmit={submit}>
        <h2 className="font-serif text-2xl">Delivery details</h2>
        <CustomInput
          id="name"
          label="Full name"
          value={formData.name}
          setValue={(value) => updateField("name", value)}
          autoComplete="name"
          maxLength={100}
          minLength={2}
        />
        <CustomInput
          id="email"
          label="Email address"
          type="email"
          value={formData.email}
          setValue={(value) => updateField("email", value)}
          autoComplete="email"
        />
        <CustomInput
          id="phone"
          label="Phone number"
          type="tel"
          value={formData.phone}
          setValue={(value) => updateField("phone", value)}
          autoComplete="tel"
          maxLength={20}
          minLength={7}
        />
        <CustomInput
          id="address"
          label="Street address"
          value={formData.address}
          setValue={(value) => updateField("address", value)}
          autoComplete="street-address"
          maxLength={200}
          minLength={5}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <CustomInput
            id="city"
            label="City"
            value={formData.city}
            setValue={(value) => updateField("city", value)}
            autoComplete="address-level2"
          />
          <CustomInput
            id="state"
            label="State"
            value={formData.state}
            setValue={(value) => updateField("state", value)}
            autoComplete="address-level1"
          />
        </div>
        <CustomInput
          id="postalCode"
          label="Postal code"
          value={formData.postalCode}
          setValue={(value) => updateField("postalCode", value)}
          autoComplete="postal-code"
          maxLength={20}
        />
        {error && (
          <p
            aria-live="polite"
            className="rounded-md bg-red-50 p-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        <button
          className="w-full rounded-sm bg-[#27372d] px-5 py-4 text-sm text-white disabled:opacity-60"
          disabled={pending}
        >
          {pending ? "Creating order…" : "Place order"}
        </button>
      </form>
      <aside className="h-fit rounded-2xl border border-[#dfdfd5] bg-[#fffdf8] p-6">
        <h2 className="font-serif text-2xl">Order summary</h2>
        <ul className="mt-5 divide-y divide-[#e8e5da]">
          {lines.map(({ book, quantity }) => (
            <li
              className="flex justify-between gap-4 py-4 text-sm"
              key={book.id}
            >
              <span>
                {book.name} <span className="text-[#73796f]">× {quantity}</span>
              </span>
              <span className="shrink-0">{money(book.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-[#dfdfd5] pt-5 font-semibold">
          <span>Total</span>
          <span>{money(subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}
