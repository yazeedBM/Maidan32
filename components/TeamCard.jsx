import Link from "next/link";
import { CategoryBadge, HackathonStats } from "./Chips";
import { SecondaryButton, OutlineOrangeButton } from "./Buttons";

/**
 * Team-ad card from the matching page: orange hackathon title, category
 * badge, "عدد الأعضاء المطلوب :" then per-member blocks (gender / role /
 * skills), stats row with orange chips, and a wide dark-blue
 * "انضم للفريق !" button next to an outlined "تفاصيل عن الهاكاثون".
 */
export default function TeamCard({ teamAd }) {
  return (
    <article className="card p-6 sm:p-8">
      {/* Title */}
      <h3 className="text-2xl font-extrabold text-accent">
        <Link
          href={`/teams/${teamAd.id}/join`}
          className="transition-colors hover:text-accent-light"
        >
          {teamAd.hackathonTitle}
        </Link>
      </h3>

      {/* Category */}
      <p className="mt-3 flex items-center gap-2 text-sm font-bold text-primary">
        التصنيف : <CategoryBadge>{teamAd.category}</CategoryBadge>
      </p>

      {/* Members needed */}
      <p className="mt-4 text-sm font-bold text-primary">
        عدد الأعضاء المطلوب :{" "}
        <span className="text-ink-soft">{teamAd.members.length}</span>
      </p>

      <div className="mt-3 space-y-4">
        {teamAd.members.map((m) => (
          <div key={m.number} className="space-y-1 text-sm font-semibold">
            <p className="font-extrabold text-primary">العضو رقم {m.number}</p>
            <p className="text-primary">
              الجنس : <span className="font-medium text-ink-soft">{m.gender}</span>
            </p>
            <p className="text-primary">
              الدور : <span className="font-medium text-ink-soft">{m.role}</span>
            </p>
            <p className="text-primary">
              المهارات المطلوبة :{" "}
              <span className="font-medium text-ink-soft">
                {m.skills.join("، ")}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <HackathonStats
        date={teamAd.date}
        location={teamAd.location}
        prize={teamAd.prize}
        workDuration={`مدة العمل التقريبية : ${teamAd.workDuration}`}
        className="mt-6"
      />
      <div className="mt-2">
        <span className="stat-chip-orange">{teamAd.attendance}</span>
      </div>

      {/* Actions: wide blue join + outline details */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <SecondaryButton
          href={`/teams/${teamAd.id}/join`}
          className="flex-1"
          size="md"
        >
          انضم للفريق !
        </SecondaryButton>
        <OutlineOrangeButton
          href={`/hackathons/${teamAd.hackathonId}`}
          size="md"
          className="sm:w-auto"
        >
          تفاصيل عن الهاكاثون
        </OutlineOrangeButton>
      </div>
    </article>
  );
}