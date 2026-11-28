import Link from "next/link";

const values = [
  {
    number: "01",
    title: "Chosen with care",
    description:
      "Our shelves bring together fiction, thoughtful nonfiction, and books for younger readers, with something for every kind of curious mind.",
  },
  {
    number: "02",
    title: "Room to discover",
    description:
      "Whether you arrive with a title in mind or want to wander, we make it easy to browse and find a story that feels right for you.",
  },
  {
    number: "03",
    title: "A good book, delivered",
    description:
      "Find a book you love, place your order, and share your delivery details at checkout. We’ll take it from there.",
  },
];

export default function About() {
  return (
    <main className="pb-16 md:pb-24">
      <section className="grid gap-10 border-b border-[#dfdfd5] py-14 md:grid-cols-[1.1fr_0.9fr] md:items-end md:py-20">
        <div>
          <p className="text-[10px] font-bold tracking-[1.7px] text-[#bd5c3d]">
            A LITTLE ABOUT NOOK
          </p>
          <h1 className="mt-5 max-w-2xl font-serif text-[clamp(3rem,7vw,5.25rem)] leading-[0.98] tracking-[-0.06em]">
            A good book finds its way <em className="font-normal text-[#bd5c3d]">to you.</em>
          </h1>
        </div>
        <div className="max-w-lg pb-1 text-sm leading-7 text-[#73796f] md:justify-self-end">
          <p>
            Nook Books is an independent bookshop for readers who love finding
            their next favorite. We bring together handpicked fiction,
            thoughtful nonfiction, and books for younger readers, all in one
            welcoming place to browse.
          </p>
          <p className="mt-4">
            Some days you know exactly what you want. Other days, the best part
            is finding a story you didn’t know you were looking for. We’re here
            for both.
          </p>
          <Link
            className="mt-6 inline-flex items-center gap-3 bg-[#27372d] px-5 py-4 text-xs text-white no-underline transition-colors hover:bg-[#3a5142]"
            href="/#collections"
          >
            Browse the shelves <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="py-14 md:py-20" aria-labelledby="what-matters">
        <div className="mb-8 max-w-lg">
          <p className="text-[10px] font-bold tracking-[1.7px] text-[#bd5c3d]">
            THE NOOK WAY
          </p>
          <h2
            className="mt-3 font-serif text-4xl tracking-[-1.5px] md:text-[43px]"
            id="what-matters"
          >
            Made for the joy of reading.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <article
              className="min-h-56 rounded-md border border-[#e8e5da] bg-[#fffdf8] p-6 md:p-7"
              key={value.number}
            >
              <p className="text-[10px] tracking-[1.4px] text-[#bd5c3d]">
                {value.number}
              </p>
              <h3 className="mt-8 font-serif text-2xl">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#73796f]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-5 border-t border-[#dfdfd5] pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[1.7px] text-[#bd5c3d]">
            YOUR NEXT CHAPTER STARTS HERE
          </p>
          <p className="mt-2 font-serif text-2xl">Take a look around.</p>
        </div>
        <Link
          className="text-sm text-[#bd5c3d] underline underline-offset-4"
          href="/#collections"
        >
          Explore our books <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
