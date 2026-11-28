"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { books } from "@/data";
import { useCartStore } from "@/store/cart-store";
import { validateCart } from "@/actions/cart";

const links = [
  { label: "Browse books", href: "/#collections" },
  { label: "About the bookshop", href: "/about" },
  { label: "Orders", href: "/orders" },
];

function CartIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="10" cy="20" r="1" fill="currentColor" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [cartReady, setCartReady] = useState(false);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    let active = true;
    useCartStore.persist.rehydrate().then(
      () => { if (active) setCartReady(true); },
      () => { if (active) setCartReady(true); },
    );
    return () => { active = false; };
  }, []);
  const cartLines = items.flatMap(({ productId, quantity }) => {
    const book = books.find((item) => item.id === productId);
    return book ? [{ book, quantity }] : [];
  });
  const displayTotal = cartLines.reduce((sum, line) => sum + line.book.price * line.quantity, 0);
  const formatPrice = (amount: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(amount);

  async function checkCart() {
    setChecking(true);
    setCartMessage("");
    try {
      const result = await validateCart({
        items: cartLines.map(({ book, quantity }) => ({ productId: book.id, quantity })),
      });
      setCartMessage(result.success
        ? `Cart checked. Server total: ${formatPrice(result.data.total)}.`
        : result.error);
    } catch {
      setCartMessage("Could not check your cart. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 flex h-19 items-center justify-between border-b border-[#dfdfd5] bg-[#f7f6f0]/95 backdrop-blur-sm md:h-22">
      <Link
        className="font-serif text-[34px] font-bold leading-none tracking-[-2px] text-[#27372d] no-underline"
        href="/"
        aria-label="Nook home"
        onClick={closeMenu}
      >
        nook <span className="text-[#bd5c3d]">books.</span>
      </Link>

      <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
        {links.map((link) => (
          <Link
            className="text-xs text-[#27372d] no-underline transition-colors hover:text-[#bd5c3d]"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button aria-label={`Shopping cart, ${cartReady ? count : 0} items`} aria-expanded={cartOpen} className="relative flex size-11 items-center justify-center rounded-full border border-[#b5b9ad] text-[#27372d]" onClick={() => setCartOpen((open) => !open)} type="button">
          <CartIcon />
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#bd5c3d] text-[10px] text-white">{cartReady ? count : 0}</span>
        </button>

        <button
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex size-11 flex-col items-center justify-center gap-1.25 rounded-full border border-[#b5b9ad] text-[#27372d] transition-colors hover:bg-[#eeede5] md:hidden"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span className="sr-only">Menu</span>
          <span className={`h-px w-4 bg-current transition-transform ${menuOpen ? "translate-y-0.75 rotate-45" : ""}`} />
          <span className={`h-px w-4 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-px w-4 bg-current transition-transform ${menuOpen ? "-translate-y-2.25 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <nav
          className="absolute inset-x-0 top-full border-b border-[#dfdfd5] bg-[#f7f6f0] px-5 py-3 shadow-sm md:hidden"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              className="block border-b border-[#dfdfd5] py-4 text-sm text-[#27372d] no-underline last:border-0"
              href={link.href}
              key={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      {cartOpen && (
        <section aria-label="Shopping cart" className="absolute right-0 top-full z-50 max-h-[75vh] w-[min(100vw-2rem,400px)] overflow-y-auto border border-[#dfdfd5] bg-[#fffdf8] p-5 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-2xl">Your cart</h2>
            <button className="text-xs text-[#73796f] underline" onClick={() => { setCartMessage(""); setCartOpen(false); }} type="button">Close</button>
          </div>
          {cartLines.length === 0 ? <p className="py-6 text-sm text-[#73796f]">Your cart is empty. Browse the shelves to find a book.</p> : (
            <>
              <ul className="divide-y divide-[#e8e5da]">
                {cartLines.map(({ book, quantity }) => (
                  <li className="flex items-center gap-3 py-4" key={book.id}>
                    <div className="min-w-0 flex-1"><p className="font-serif text-base">{book.name}</p><p className="mt-1 text-xs text-[#73796f]">{formatPrice(book.price)} each</p></div>
                    <label className="sr-only" htmlFor={`quantity-${book.id}`}>Quantity for {book.name}</label>
                    <input className="w-14 rounded border border-[#b5b9ad] bg-white px-2 py-1 text-center text-sm" id={`quantity-${book.id}`} min="1" max={book.stock} onChange={(event) => setQuantity(book.id, Number(event.target.value))} type="number" value={quantity} />
                    <button aria-label={`Remove ${book.name}`} className="text-xs text-[#bd5c3d] underline" onClick={() => removeItem(book.id)} type="button">Remove</button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t border-[#dfdfd5] py-4 text-sm font-semibold"><span>Subtotal</span><span>{formatPrice(displayTotal)}</span></div>
              <button className="w-full bg-[#27372d] px-4 py-3 text-xs text-white disabled:opacity-60" disabled={checking} onClick={checkCart} type="button">{checking ? "Checking…" : "Check cart total"}</button>
              <Link className="mt-2 block w-full bg-[#bd5c3d] px-4 py-3 text-center text-xs text-white no-underline" href="/cart" onClick={() => setCartOpen(false)}>Continue to checkout</Link>
              {cartMessage && <p aria-live="polite" className="mt-3 text-xs text-[#526b58]">{cartMessage}</p>}
            </>
          )}
        </section>
      )}

    </header>
  );
}
