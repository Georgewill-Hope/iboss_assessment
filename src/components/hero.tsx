export default function Hero() {
  return (
    <section
      className="grid grid-cols-1 gap-10 pt-14 md:min-h-[600px] md:grid-cols-[1fr_0.93fr] md:grid-rows-[1fr_auto] md:gap-x-[7%] md:pt-20"
      id="top"
    >
      <div className="self-center pb-5 md:pb-9">
        <p className="text-[10px] font-bold tracking-[1.7px] text-[#bd5c3d]">AN INDEPENDENT BOOKSHOP</p>
        <h1 className="mb-5 mt-6 font-serif text-[clamp(3.5rem,8vw,5.25rem)] leading-[0.99] tracking-[-0.06em] text-[#27372d]">
          Stories worth<br />staying <em className="font-normal text-[#bd5c3d]">for.</em>
        </h1>
        <p className="max-w-[370px] text-[15px] leading-8 text-[#73796f]">
          Find your next favorite among handpicked fiction, thoughtful nonfiction, and books for younger readers.
        </p>
        <a
          className="mt-6 inline-flex items-center gap-7 bg-[#27372d] px-5 py-4 text-xs text-white no-underline transition-colors hover:bg-[#3a5142]"
          href="#collections"
        >
          Browse the shelves <span className="text-[#d9a48c]" aria-hidden="true">↓</span>
        </a>
      </div>

      {/* The illustration is built from CSS shapes so this page needs no external image asset. */}
      <div
        className="relative h-[350px] self-center overflow-hidden bg-[#e9e3d6] sm:h-[410px]"
        role="img"
        aria-label="Illustration of colorful books arranged on a reading-room shelf"
      >
        <div className="absolute right-[13%] top-[9%] size-[190px] rounded-full bg-[#dfb77f]" />
        <p className="absolute left-7 top-7 z-[2] text-[9px] leading-relaxed tracking-[1.4px] text-[#536150]">
          TAKE A STORY<br />SOMEWHERE NEW
        </p>
        <div className="absolute bottom-[20%] left-[13%] z-[2] h-24 w-[74%] bg-[#a67e5f] shadow-[0_13px_0_#8b694f]" />
        <div className="absolute bottom-[43%] left-[19%] z-[1] flex h-[150px] w-[78px] items-center justify-center rounded-sm bg-[#bd5c3d] px-3 text-center font-serif text-sm leading-tight text-[#fff5e7] shadow-[5px_5px_0_#ead3ae] sm:left-[20%] sm:w-[92px]">
          THE<br />LONG<br />WAY HOME
        </div>
        <div className="absolute bottom-[39%] left-[38%] z-[2] flex h-[166px] w-[78px] items-center justify-center rounded-sm bg-[#526b58] px-2 text-center font-serif text-sm leading-tight text-[#f4ecd9] shadow-[5px_5px_0_#d4c3a4]">
          FIELD<br />NOTES
        </div>
        <div className="absolute bottom-[43%] left-[56%] z-[1] flex h-[150px] w-[83px] items-center justify-center rounded-sm bg-[#d49b50] px-2 text-center font-serif text-sm leading-tight text-[#27372d] shadow-[5px_5px_0_#ead3ae]">
          SMALL<br />WONDERS
        </div>
        <div className="absolute bottom-[46%] left-[75%] z-[1] hidden h-[138px] w-[62px] items-center justify-center rounded-sm bg-[#61788d] px-2 text-center font-serif text-xs leading-tight text-white shadow-[5px_5px_0_#d4c3a4] sm:flex">
          BLUE<br />HOUR
        </div>
        <div className="absolute bottom-[20%] left-[13%] z-[3] h-2 w-[74%] bg-[#795b45]" />
      </div>

      <div className="col-span-full flex justify-between border-t border-[#dfdfd5] py-[18px] text-[9px] tracking-[1.2px] text-[#898d83]">
        <span>BOOKS FOR CURIOUS MINDS</span><span>01 — 03</span>
      </div>
    </section>
  );
}
