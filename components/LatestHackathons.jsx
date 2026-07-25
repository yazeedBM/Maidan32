"use client";

import { useRef } from "react";
import Link from "next/link";
import { PrimaryButton } from "./Buttons";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";

/**
 * "أحدث الهاكاثونات" — heading row (title right, orange CTA left) sitting on
 * the pale-blue → mid-blue band, then a peeking horizontal carousel: the
 * centre card is full-bleed with a caption overlay, neighbours bleed off
 * both edges, and chevrons overlay the band on each side.
 */
export default function LatestHackathons({ hackathons = [] }) {
  const trackRef = useRef(null);

  function scrollByCard(dir) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 24 : 420;
    // RTL tracks scroll in the negative direction.
    track.scrollBy({ left: -dir * step, behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="latest-title"
      className="relative overflow-hidden bg-carousel-band pb-16 pt-20"
    >
      <div className="container-site">
        <div className="flex flex-col-reverse items-center gap-6 sm:flex-row sm:justify-between">
          <PrimaryButton href="/hackathons" size="sm">
            اكتشف جميع الهاكاثونات
          </PrimaryButton>
          <h2 id="latest-title" className="section-title">
            أحدث الهاكاثونات
          </h2>
        </div>
      </div>

      <div className="relative mt-12">
        <div
          ref={trackRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-[12vw] pb-2"
        >
          {hackathons.map((h) => (
            <article
              key={h.id}
              data-card
              className="group relative h-[230px] w-[78vw] shrink-0 snap-center overflow-hidden rounded-card shadow-card-lg sm:h-[250px] sm:w-[440px]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-primary bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ backgroundImage: `url('${h.image}')` }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-5 text-right">
                <div className="flex flex-row-reverse items-center justify-start gap-3">
                  <h3 className="text-[19px] font-extrabold text-white">
                    {h.title}
                  </h3>
                  <Link
                    href={`/hackathons/${h.id}`}
                    className="shrink-0 rounded-field bg-white/15 px-3 py-1 text-[11px] font-bold text-white ring-1 ring-inset ring-white/50 backdrop-blur-sm transition-colors hover:bg-white hover:text-primary"
                  >
                    مزيد من التفاصيل
                  </Link>
                </div>
                <p className="mt-2 line-clamp-2 text-[12px] font-medium leading-relaxed text-white/85">
                  {h.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="السابق"
          className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition hover:bg-white/20 sm:flex"
        >
          <ArrowRightIcon className="h-7 w-7" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="التالي"
          className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition hover:bg-white/20 sm:flex"
        >
          <ArrowLeftIcon className="h-7 w-7" />
        </button>
      </div>
    </section>
  );
}
