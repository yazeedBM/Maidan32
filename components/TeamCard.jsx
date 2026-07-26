import { CategoryBadge, HackathonStats } from "./Chips";
import { SecondaryButton, OutlineOrangeButton } from "./Buttons";

/** One member's requirement block inside a team ad. */
function MemberBlock({ member }) {
  return (
    <div className="space-y-[3px] text-[13px]">
      <p className="font-extrabold text-primary">العضو رقم {member.number}</p>
      <p className="font-bold text-primary">
        الجنس : <span className="font-medium text-ink-soft">{member.gender}</span>
      </p>
      <p className="font-bold text-primary">
        الدور : <span className="font-medium text-ink-soft">{member.role}</span>
      </p>
      <p className="font-bold text-primary">
        المهارات المطلوبة :{" "}
        <span className="font-medium text-ink-soft">
          {member.skills.join("، ")}
        </span>
      </p>
    </div>
  );
}

/**
 * Team-ad card on the matching page: orange hackathon title, category badge,
 * required-member count, a block per member, the stat chip row, then the wide
 * blue "انضم للفريق !" beside the outlined "تفاصيل عن الهاكاثون".
 */
export default function TeamCard({ teamAd }) {
  return (
    <article className="card p-6 text-right sm:p-7">
      <h3 className="text-[22px] font-extrabold text-accent">
        {teamAd.hackathonTitle}
      </h3>

      <p className="mt-3 flex items-center gap-2 text-[13px] font-bold text-primary">
        التصنيف : <CategoryBadge>{teamAd.category}</CategoryBadge>
      </p>

      <p className="mt-4 text-[13px] font-bold text-primary">
        عدد الأعضاء المطلوب :{" "}
        <span className="font-medium text-ink-soft">{teamAd.members.length}</span>
      </p>

      <div className="mt-4 space-y-4">
        {teamAd.members.map((m) => (
          <MemberBlock key={m.number} member={m} />
        ))}
      </div>

      <HackathonStats
        date={teamAd.date}
        location={teamAd.location}
        prize={teamAd.prize}
        workDuration={`مدة العمل التقريبية : ${teamAd.workDuration}`}
        attendance={teamAd.attendance}
        className="mt-6"
      />

      {/* Join first → RTL renders it as the wide right-hand button */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <SecondaryButton href={`/teams/${teamAd.id}/join`} className="flex-1" size="md">
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
