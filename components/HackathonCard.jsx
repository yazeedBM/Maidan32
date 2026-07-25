import Link from "next/link";
import { HackathonStats } from "./Chips";
import { OutlineBlueButton } from "./Buttons";

/**
 * Hackathon list card (hackathons page): white card, square image on the
 * right (RTL start), title + fields line, stat chips row, and an
 * "اعرف أكثر" outline button at the far left.
 *
 * The Figma frame shows a solid red square where the hackathon image goes —
 * rendered here as the real image with a red PLACEHOLDER fallback.
 */
export default function HackathonCard({ hackathon }) {
  const { id, title, fields, duration, members, prize, date, image } =
    hackathon;

  return (
    <article className="card p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Image — right side in RTL */}
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#C00000]">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={`شعار ${title}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Text + chips */}
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-extrabold text-ink sm:text-2xl">
            <Link
              href={`/hackathons/${id}`}
              className="transition-colors hover:text-primary"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-sm font-semibold text-ink-soft">
            مجالات الهاكاثون: {fields}
          </p>

          <HackathonStats
            duration={duration}
            members={members}
            prize={prize}
            date={date}
            className="mt-4"
          />
        </div>

        {/* CTA — far left */}
        <div className="shrink-0 sm:self-center">
          <OutlineBlueButton href={`/hackathons/${id}`} size="sm">
            اعرف أكثر
          </OutlineBlueButton>
        </div>
      </div>
    </article>
  );
}