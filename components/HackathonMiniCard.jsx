import { CategoryBadge, HackathonStats } from "./Chips";

/**
 * Compact hackathon summary shown at the top of the create-ad and
 * join-request pages: orange title, category row, an optional target-member
 * block (join page only), then the stat chip row.
 */
export default function HackathonMiniCard({ teamAd, memberNumber }) {
  const member = memberNumber
    ? teamAd.members.find((m) => m.number === memberNumber)
    : null;

  return (
    <section aria-label="ملخص الهاكاثون" className="card p-6 text-right sm:p-7">
      <h2 className="text-[20px] font-extrabold text-accent">
        {teamAd.hackathonTitle}
      </h2>

      <p className="mt-3 flex items-center gap-2 text-[13px] font-bold text-primary">
        التصنيف : <CategoryBadge>{teamAd.category}</CategoryBadge>
      </p>

      {member && (
        <div className="mt-3 space-y-[3px] text-[13px]">
          <p className="font-extrabold text-primary">العضو رقم {member.number}</p>
          <div className="flex flex-wrap gap-x-10 gap-y-1">
            <p className="font-bold text-primary">
              الجنس :{" "}
              <span className="font-medium text-ink-soft">{member.gender}</span>
            </p>
            <p className="font-bold text-primary">
              الدور :{" "}
              <span className="font-medium text-ink-soft">{member.role}</span>
            </p>
            <p className="font-bold text-primary">
              المهارات المطلوبة :{" "}
              <span className="font-medium text-ink-soft">
                {member.skills.join("، ")}
              </span>
            </p>
          </div>
        </div>
      )}

      <HackathonStats
        date={teamAd.date}
        location={teamAd.location}
        prize={teamAd.prize}
        workDuration={`مدة العمل التقريبية : ${teamAd.workDuration}`}
        attendance={teamAd.attendance}
        className="mt-5"
      />
    </section>
  );
}
