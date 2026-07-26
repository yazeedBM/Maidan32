import { MedalIcon } from "./Icons";

/**
 * "أبطال الميدان" — blue field with warm corner glows, centred heading, then
 * the asymmetric photo mosaic.
 *
 * Mosaic proportions are taken from the Figma frame (1440 wide):
 *   left  column 616px — large 675 tall, then two 272-tall tiles
 *   right column 555px — 377 tall on top, 570 tall below
 * Both columns total 971px, so the two sides always finish flush. The flex
 * ratios below reproduce that at any width.
 */
const LEFT_LARGE = { src: "/images/champion-1.jpg", alt: "تكريم الفائزين على مسرح الهاكاثون" };
const LEFT_SMALL = [
  { src: "/images/champion-4.jpg", alt: "جدول الجلسات الإرشادية" },
  { src: "/images/champion-5.jpg", alt: "جلسة عمل للمشاركات" },
];
const RIGHT = [
  { src: "/images/champion-2.jpg", alt: "فريق يرفع كأس المركز الأول", grow: 377 },
  { src: "/images/champion-3.jpg", alt: "تسليم جائزة ٣٠٬٠٠٠ ريال", grow: 570 },
];

function Tile({ src, alt, className = "", style }) {
  return (
    <figure
      className={`overflow-hidden rounded-card bg-primary/25 ${className}`}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.05]"
      />
    </figure>
  );
}

export default function ChampionsSection() {
  return (
    <section
      aria-labelledby="champions-title"
      className="relative overflow-hidden bg-champions-glow py-20 sm:py-24"
    >
      <div className="container-site">
        <div className="flex flex-col items-center text-center">
          <MedalIcon className="h-11 w-11 text-accent" />
          <h2
            id="champions-title"
            className="mt-3 text-[34px] font-extrabold text-white sm:text-[42px]"
          >
            أبطال الميدان
          </h2>
          <p className="mt-3 text-[16px] font-medium text-white/95 sm:text-[17px]">
            قصص نجاح تلهمك، وإنجازات تثبت أن كل فكرة عظيمة تبدأ بخطوة
          </p>
        </div>

        {/* Mosaic — stacks to a simple 2-up grid on small screens */}
        <div className="mt-12 grid grid-cols-2 gap-5 sm:hidden">
          <Tile {...LEFT_LARGE} className="col-span-2 aspect-[16/11]" />
          {LEFT_SMALL.map((p) => (
            <Tile key={p.src} {...p} className="aspect-square" />
          ))}
          {RIGHT.map((p) => (
            <Tile key={p.src} {...p} className="aspect-square" />
          ))}
        </div>

        <div className="mt-14 hidden gap-6 sm:flex" style={{ aspectRatio: "1195 / 971" }}>
          {/* Left column — 616 / 1195 of the row */}
          <div className="flex min-w-0 flex-col gap-6" style={{ flex: "616 1 0%" }}>
            <Tile {...LEFT_LARGE} style={{ flex: "675 1 0%" }} />
            <div className="flex gap-6" style={{ flex: "272 1 0%" }}>
              <Tile {...LEFT_SMALL[0]} style={{ flex: "275 1 0%" }} />
              <Tile {...LEFT_SMALL[1]} style={{ flex: "319 1 0%" }} />
            </div>
          </div>

          {/* Right column — 555 / 1195 of the row */}
          <div className="flex min-w-0 flex-col gap-6" style={{ flex: "555 1 0%" }}>
            {RIGHT.map((p) => (
              <Tile key={p.src} {...p} style={{ flex: `${p.grow} 1 0%` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
