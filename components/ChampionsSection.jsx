import { MedalIcon } from "./Icons";

/**
 * "أبطال الميدان" — blue/orange glow background, medal icon, heading,
 * subtitle, then an asymmetric photo mosaic (masonry-style, 2 columns on
 * mobile, tighter collage on desktop) matching the Figma layout.
 *
 * PLACEHOLDERS: /public/images/champion-1.jpg … champion-6.jpg
 */
const PHOTOS = [
  { src: "/images/champion-1.jpg", alt: "تكريم الفائزين على المسرح", tall: true },
  { src: "/images/champion-2.jpg", alt: "فريق يرفع كأس المركز الأول" },
  { src: "/images/champion-3.jpg", alt: "تسليم جائزة ٣٠٠٠٠ ريال", tall: true },
  { src: "/images/champion-4.jpg", alt: "جدول الجلسات الإرشادية" },
  { src: "/images/champion-5.jpg", alt: "جلسة عصف ذهني للمشاركات" },
  { src: "/images/champion-6.jpg", alt: "ورشة عمل تفاعلية" },
];

export default function ChampionsSection() {
  return (
    <section
      aria-labelledby="champions-title"
      className="relative overflow-hidden bg-champions-glow py-20 sm:py-24"
    >
      <div className="container-site">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full text-accent">
            <MedalIcon className="h-12 w-12" />
          </span>
          <h2
            id="champions-title"
            className="mt-3 text-3xl font-extrabold text-white sm:text-4xl"
          >
            أبطال الميدان
          </h2>
          <p className="mt-3 text-base font-medium text-white/90">
            قصص نجاح تلهمك، وإنجازات تثبت أن كل فكرة عظيمة تبدأ بخطوة
          </p>
        </div>

        {/* Photo mosaic */}
        <div className="mt-12 columns-2 gap-4 sm:columns-3 [&>figure]:mb-4">
          {PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              className={`break-inside-avoid overflow-hidden rounded-card bg-primary-navy/40 shadow-card ${
                photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}