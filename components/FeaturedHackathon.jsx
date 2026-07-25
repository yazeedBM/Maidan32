import { HackathonStats } from "./Chips";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { ArrowLeftIcon } from "./Icons";

/**
 * Featured hackathon banner at the top of the hackathons page:
 * white card with blue hairline border, hackathon logo on the right,
 * title + fields, stat chip row (with location pin chip), and two CTAs —
 * blue "أعثر على فريق" + orange "أنشئ فريقا!" — with a pager chevron on
 * the far left edge.
 */
export default function FeaturedHackathon({ hackathon }) {
  const {
    id,
    title,
    fields,
    duration,
    members,
    prize,
    date,
    location,
    logo,
  } = hackathon;

  return (
    <section
      aria-label="الهاكاثون المميز"
      className="card relative border border-primary/25 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Logo — PLACEHOLDER swirl logo from Figma */}
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-accent-soft">
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt={`شعار ${title}`}
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {/* Title + fields + stats */}
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-sm font-semibold text-ink-soft">
            مجالات الهاكاثون: {fields}
          </p>
          <HackathonStats
            duration={duration}
            members={members}
            prize={prize}
            date={date}
            location={location}
            className="mt-4"
          />
        </div>

        {/* CTAs */}
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <SecondaryButton href={`/teams?hackathon=${id}`} size="sm">
            أعثر على فريق
          </SecondaryButton>
          <PrimaryButton href={`/teams/create?hackathon=${id}`} size="sm">
            أنشئ فريقا!
          </PrimaryButton>
        </div>
      </div>

      {/* Pager chevron on the far-left edge (previous featured item) */}
      <button
        type="button"
        aria-label="الهاكاثون المميز السابق"
        className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-ink-faint transition hover:bg-surface-muted hover:text-primary lg:flex"
      >
        <ArrowLeftIcon />
      </button>
    </section>
  );
}