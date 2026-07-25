"use client";

import { useRef } from "react";
import Link from "next/link";
import { PrimaryButton } from "./Buttons";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";

/**
 * "أحدث الهاكاثونات" — horizontal carousel on the blue gradient band.
 * Center card enlarged with photo, title, one-line description and a
 * "مزيد من التفاصيل" pill; side cards peek from the edges.
 */
export default function LatestHackathons({ hackathons = [] }) {
  const trackRef = useRef(null);

  function scrollByCard(dir) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 24 : 420;
    // dir: 1 = next, -1 = previous. RTL containers scroll negative.
    track.scrollBy({ left: -dir * step, behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="latest-title"
      className="relative overflow-hidden bg-carousel-band py-20"
    >
      <div className="container-site">
        {/* Heading row: title right, orange button left */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <h2 id="latest-title" className="section-title">
            أحدث الهاكاثونات
          </h2>
          <PrimaryButton href="/hackathons" size="sm">
            اكتشف جميع الهاكاثونات
          </PrimaryButton>
        </div>
      </div>

      <div className="relative mt-12">
        {/* Track */}
        <div
          ref={trackRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-[8vw] pb-4"
        >
          {hackathons.map((h) => (
            <article
              key={h.id}
              data-card
              className="group relative h-64 w-[85vw] max-w-md shrink-0 snap-center overflow-hidden rounded-card shadow-card-lg sm:h-72 sm:w-[26rem]"
            >
              {/* Card photo — PLACEHOLDER images from lib/sampleData */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-primary-navy bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url('${h.image}')` }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent"
              />

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-extrabold text-white">
                    {h.title}
                  </h3>
                  <Link
                    href={`/hackathons/${h.id}`}
                    className="shrink-0 rounded-pill border border-white/60 px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-white hover:text-primary"
                  >
                    مزيد من التفاصيل
                  </Link>
                </div>
                <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-white/85">
                  {h.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="السابق"
          className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-card transition hover:bg-white sm:flex"
        >
          <ArrowRightIcon />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="التالي"
          className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-card transition hover:bg-white sm:flex"
        >
          <ArrowLeftIcon />
        </button>
      </div>
    </section>
  );
}