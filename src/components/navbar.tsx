"use client";

import { useState } from "react";

const links = [
  { label: "Browse books", href: "#collections" },
  { label: "About the bookshop", href: "#about" },
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

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 flex h-[76px] items-center justify-between border-b border-[#dfdfd5] bg-[#f7f6f0]/95 backdrop-blur-sm md:h-[88px]">
      <a
        className="font-serif text-[34px] font-bold leading-none tracking-[-2px] text-[#27372d] no-underline"
        href="#top"
        aria-label="Nook home"
        onClick={closeMenu}
      >
        nook <span className="text-[#bd5c3d]">books.</span>
      </a>

      <nav className="hidden items-center gap-10 md:flex" aria-label="Main navigation">
        {links.map((link) => (
          <a
            className="text-xs text-[#27372d] no-underline transition-colors hover:text-[#bd5c3d]"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <span
          aria-label="Shopping cart"
          className="flex size-11 items-center justify-center rounded-full border border-[#b5b9ad] text-[#27372d]"
          role="img"
        >
          <CartIcon />
        </span>

        <button
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-full border border-[#b5b9ad] text-[#27372d] transition-colors hover:bg-[#eeede5] md:hidden"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          <span className="sr-only">Menu</span>
          <span className={`h-px w-4 bg-current transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-4 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-px w-4 bg-current transition-transform ${menuOpen ? "-translate-y-[9px] -rotate-45" : ""}`} />
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

    </header>
  );
}
