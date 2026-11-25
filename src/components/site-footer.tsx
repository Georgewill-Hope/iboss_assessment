export default function SiteFooter() {
  return (
    <footer className="flex min-h-24 flex-wrap items-center justify-between gap-3 border-t border-[#dfdfd5] py-5">
      <a className="font-serif text-[26px] font-bold tracking-[-2px] text-[#27372d] no-underline" href="#top" aria-label="Nook Books home">
        nook <span className="text-[#bd5c3d]">books.</span>
      </a>
      <p className="font-serif text-[13px] italic text-[#73796f]">A good book finds its way to you.</p>
      <span className="text-[9px] tracking-[1px] text-[#898d83]">© 2026 NOOK BOOKS</span>
    </footer>
  );
}
