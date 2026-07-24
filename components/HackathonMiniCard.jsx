import Link from "next/link";

export default function HackathonMiniCard({ hackathon }) {
  const dateStr = new Date(hackathon.date).toLocaleDateString("ar-SA", {
    day: "numeric",
    month: "long",
  });

  return (
    <Link
      href={`/hackathons/${hackathon._id}`}
      className="card group block overflow-hidden"
    >
      <div className="relative flex h-36 items-end bg-gradient-to-br from-navy-800 to-navy-950 p-4">
        <span className="badge bg-white/90 text-navy-900">{dateStr}</span>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold text-brand-orange">{hackathon.organizer || "جهة منظمة"}</p>
        <h3 className="mt-1 truncate text-base font-extrabold text-navy-900 group-hover:text-brand-blue">
          {hackathon.title}
        </h3>
        <p className="mt-1 truncate text-xs text-navy-800/60">{hackathon.location}</p>
      </div>
    </Link>
  );
}
