import { CategoryBadge, HackathonStats } from "./Chips";

/**
 * Compact hackathon summary card shown at the top of the create-ad and
 * join-request pages: title in orange, category row, optional member
 * summary line, then the stats row with orange chips.
 *
 * @param {object} props
 * @param {object} props.teamAd  — team ad object from lib/sampleData shape
 * @param {number} [props.memberNumber] — when set (join page), shows the
 *   "العضو رقم N" line with gender/role/skills of that member.
 */
export default function HackathonMiniCard({ teamAd, memberNumber }) {
  const member = memberNumber
    ? teamAd.members.find((m) => m.number === memberNumber)
    : null;

  return (
    <section aria-label="ملخص الهاكاثون" className="card p-6 sm:p-8">
      <h2 className="text-2xl font-extrabold text-accent">
        {teamAd.hackathonTitle}
      </h2>

      <p className="mt-3 flex items-center gap-2 text-sm font-bold text-primary">
        التصنيف : <CategoryBadge>{teamAd.category}</CategoryBadge>
      </p>

      {member && (
        <div className="mt-3 space-y-1 text-sm font-semibold">
          <p className="font-extrabold text-primary">
            العضو رقم {member.number}
          </p>
          <p className="text-primary">
            الجنس : <span className="text-ink-soft">{member.gender}</span>
          </p>
          <p className="text-primary">
            الدور : <span className="text-ink-soft">{member.role}</span>
          </p>
          <p className="text-primary">
            المهارات المطلوبة :{" "}
            <span className="text-ink-soft">{member.skills.join("، ")}</span>
          </p>
        </div>
      )}

      <HackathonStats
        date={teamAd.date}
        location={teamAd.location}
        prize={teamAd.prize}
        workDuration={`مدة العمل التقريبية : ${teamAd.workDuration}`}
        locationAsOrange={false}
        className="mt-5"
      />
      <div className="mt-2">
        <span className="stat-chip-orange">{teamAd.attendance}</span>
      </div>
    </section>
  );
}