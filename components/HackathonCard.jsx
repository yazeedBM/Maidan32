import Link from "next/link";
import { CalendarIcon, UsersIcon, ClockIcon, MoneyIcon, LocationIcon } from "./Icons";

export default function HackathonCard({ hackathon, isAdmin }) {
  const dateStr = new Date(hackathon.date).toLocaleDateString("ar-SA", {
    day: "numeric",
    month: "long",
  });

  return (
    <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-lg font-black text-brand-orange">
        {hackathon.title?.charAt(0) || "ه"}
      </div>

      <div className="min-w-0 flex-1">
        <Link href={`/hackathons/${hackathon._id}`}>
          <h3 className="truncate text-base font-extrabold text-navy-900 hover:text-brand-blue">
            {hackathon.title}
          </h3>
        </Link>
        <p className="mt-0.5 truncate text-xs text-navy-800/60">{hackathon.organizer}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-navy-800/70">
          <span className="flex items-center gap-1">
            <LocationIcon /> {hackathon.location}
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon /> {dateStr}
          </span>
          <span className="flex items-center gap-1">
            <MoneyIcon /> {hackathon.prize?.toLocaleString("ar-SA") || 0} $
          </span>
          <span className="flex items-center gap-1">
            <UsersIcon /> {hackathon.teamSizeMin}-{hackathon.teamSizeMax} أعضاء
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon /> {hackathon.durationDays} يوم
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-2 sm:flex-col">
        <Link href={`/hackathons/${hackathon._id}`} className="btn-blue flex-1 sm:flex-none">
          أكثر على فريق
        </Link>
        {isAdmin && (
          <Link href={`/admin/teams?hackathon=${hackathon._id}`} className="btn-orange flex-1 sm:flex-none">
            أنشئ فريق
          </Link>
        )}
      </div>
    </div>
  );
}
