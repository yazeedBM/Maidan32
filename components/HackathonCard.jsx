import Link from "next/link";
import { HackathonStats } from "./Chips";
import { OutlineBlueButton } from "./Buttons";

/**
 * Hackathon list card: square cover on the right (RTL start), title and
 * fields beside it with the stat chip row underneath, and the "اعرف أكثر"
 * outline button pinned to the far left.
 */
export default function HackathonCard({ hackathon }) {
  const { id, title, fields, duration, members, prize, date, image } = hackathon;

  return (
    <article className="card p-5 text-right sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Cover first → right side in RTL */}
        <div className="h-[86px] w-[86px] shrink-0 overflow-hidden rounded-lg bg-[#C00000]">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={`صورة ${title}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[20px] font-extrabold text-ink sm:text-[23px]">
            <Link
              href={`/hackathons/${id}`}
              className="transition-colors hover:text-primary"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-[13px] font-medium text-ink-soft">
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

        <div className="shrink-0 sm:self-center">
          <OutlineBlueButton href={`/hackathons/${id}`} size="sm">
            اعرف أكثر
          </OutlineBlueButton>
        </div>
      </div>
    </article>
  );
}
