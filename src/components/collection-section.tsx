import Image from "next/image";
import { books } from "@/data";

const imageBlurDataUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 50'%3E%3Cfilter id='b' x='0' y='0'%3E%3CfeGaussianBlur stdDeviation='8'/%3E%3C/filter%3E%3Crect width='40' height='50' fill='%23d7c9ad' filter='url(%23b)'/%3E%3C/svg%3E";

const formatPrice = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export default function CollectionSection() {
  return (
    <section className="py-16 md:py-20" id="collections">
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold tracking-[1.7px] text-[#bd5c3d]">
            A FEW GOOD PLACES TO START
          </p>
          <h2 className="mt-2 font-serif text-[38px] font-normal tracking-[-1.5px] sm:text-[43px]">
            Browse the shelves.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {books.map((book) => {
          const isUnavailable = book.stock === 0;

          return (
            <article
              className={`group flex gap-4 rounded-md border p-4 transition-shadow sm:block cursor-pointer ${
                isUnavailable
                  ? "border-[#39443f] bg-[#303a35] text-[#e9e8df] shadow-inner shadow-black/10 opacity-70"
                  : "border-[#e8e5da] bg-[#fffdf8] hover:shadow-[0_10px_30px_-20px_#27372d]"
              }`}
              key={book.id}
            >
              <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-sm bg-[#eee9dc] shadow-sm transition-transform duration-300 group-hover:-translate-y-1 sm:mb-4 sm:w-full">
                {book.image ? (
                  <Image
                    alt={`${book.name} cover`}
                    className="object-cover"
                    fill
                    placeholder="blur"
                    blurDataURL={imageBlurDataUrl}
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 50vw, 25vw"
                    src={book.image}
                  />
                ) : (
                  <div
                    aria-label={`Placeholder cover for ${book.name}`}
                    className={`absolute inset-[7%] flex flex-col items-center justify-between overflow-hidden px-3 py-4 text-center text-[#fffaf0] shadow-[3px_4px_0_#c8bca5] ${book.coverColor}`}
                    role="img"
                  >
                    <span className="text-[6px] font-semibold tracking-[1.5px]">
                      NOOK BOOKS
                    </span>
                    <span className={`h-px w-8 ${book.coverAccent}`} />
                    <span className="font-serif text-base leading-tight sm:text-lg">
                      {book.name}
                    </span>
                    <span className="text-[8px] leading-tight opacity-90">
                      {book.author}
                    </span>
                    <span className={`h-1 w-10 ${book.coverAccent}`} />
                  </div>
                )}
                {isUnavailable && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#17211d]/65 px-2 text-center backdrop-blur-[1px]">
                    <span className="rounded-full border border-white/40 bg-[#17211d]/55 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[1.5px] text-white shadow-lg sm:text-[10px]">
                      Currently unavailable
                    </span>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col sm:min-h-[180px]">
                <p className={`mb-1 text-[9px] font-bold uppercase tracking-[1.3px] ${isUnavailable ? "text-[#e5a28b]" : "text-[#bd5c3d]"}`}>
                  {book.category}
                </p>
                <h3 className={`font-serif text-lg leading-snug ${isUnavailable ? "text-[#f1efe7]" : "text-[#27372d]"}`}>
                  {book.name}
                </h3>
                <p className={`mt-1 text-xs ${isUnavailable ? "text-[#c1c7c0]" : "text-[#73796f]"}`}>by {book.author}</p>
                <p className={`mt-3 line-clamp-3 text-xs leading-relaxed ${isUnavailable ? "text-[#c1c7c0]" : "text-[#62695f]"}`}>
                  {book.description}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4">
                  <span className={`font-semibold ${isUnavailable ? "text-[#f1efe7]" : "text-[#27372d]"}`}>
                    {formatPrice.format(book.price)}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
