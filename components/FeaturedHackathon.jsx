import { HackathonStats } from "./Chips";
import { PrimaryButton, SecondaryButton } from "./Buttons";
import { ArrowLeftIcon } from "./Icons";

/**
 * Featured banner at the top of the hackathons page — white card with the
 * orange hairline border from the Figma. Logo sits at the right (RTL start),
 * title and fields beside it, the blue + orange CTA pair on the left, and
 * the stat chip row underneath with a pager chevron on the far-left edge.
 */
export default function FeaturedHackathon({ hackathon }) {
  const { id, title, fields, duration, members, prize, date, location, logo, image } =
    hackathon;
  const thumb = logo || image;

  return (
    <section
      aria-label="الهاكاثون المميز"
      className="relative rounded-card border border-accent bg-white p-5 text-right sm:p-6"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        {/* Thumb first → right side in RTL */}
        <div className="h-[74px] w-[74px] shrink-0 overflow-hidden rounded-lg bg-accent/10">
          {thumb && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb}
              alt={`شعار ${title}`}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-[22px] font-extrabold text-ink sm:text-[25px]">
            {title}
          </h2>
          <p className="mt-1 text-[13px] font-medium text-ink-soft">
            مجالات الهاكاثون: {fields}
          </p>
        </div>

        {/* CTAs — blue first so RTL keeps the orange on the far left */}
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <SecondaryButton href={`/teams?hackathon=${id}`} size="sm">
            أعثر على فريق
          </SecondaryButton>
          <PrimaryButton href={`/teams/create?hackathon=${id}`} size="sm">
            أنشئ فريقا!
          </PrimaryButton>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <HackathonStats
          duration={duration}
          members={members}
          prize={prize}
          date={date}
          location={location}
        />

        <button
          type="button"
          aria-label="الهاكاثون المميز السابق"
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-faint transition hover:bg-surface-muted hover:text-primary lg:inline-flex"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
