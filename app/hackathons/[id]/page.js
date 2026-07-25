import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { serializeHackathon, serializeTeam } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";
import TeamCard from "@/components/TeamCard";
import Footer from "@/components/Footer";
import { CalendarIcon, UsersIcon, ClockIcon, MoneyIcon, LocationIcon } from "@/components/Icons";
import Link from "next/link";

async function getData(id, currentUserId) {
  const hackathon = await prisma.hackathon.findUnique({ where: { id } });
  if (!hackathon) return null;

  const teamsRaw = await prisma.team.findMany({
    where: { hackathonId: id },
    include: { members: { include: { user: true } } },
    orderBy: { createdAt: "desc" },
  });

  return {
    hackathon: serializeHackathon(hackathon),
    teams: teamsRaw.map((t) => serializeTeam(t, { currentUserId })),
  };
}

export default async function HackathonDetailPage({ params }) {
  const sessionUser = getSessionUser();
  const data = await getData(params.id, sessionUser?.id);
  if (!data) notFound();
  const { hackathon, teams } = data;

  const dateStr = new Date(hackathon.date).toLocaleDateString("ar-SA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      <section className="bg-navy-950 py-14 text-center">
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">الهاكاثونات</h1>
        <p className="mt-3 text-sm text-white/60">شارك و أثبت أنك الأفضل</p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <div className="card overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-navy-900/10 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-2xl font-black text-brand-orange">
                {hackathon.title.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-navy-900 md:text-2xl">{hackathon.title}</h2>
                <p className="text-sm text-navy-800/60">{hackathon.organizer}</p>
              </div>
            </div>
            <a
              href={hackathon.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange shrink-0"
            >
              زيارة الموقع الرسمي ↗
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-navy-900/10 p-6 text-sm text-navy-800/80 sm:grid-cols-3">
            <div className="flex items-center gap-2"><LocationIcon /> {hackathon.location}</div>
            <div className="flex items-center gap-2"><CalendarIcon /> {dateStr}</div>
            <div className="flex items-center gap-2"><MoneyIcon /> {hackathon.prize?.toLocaleString("ar-SA")} $</div>
            <div className="flex items-center gap-2"><UsersIcon /> {hackathon.teamSizeMin}-{hackathon.teamSizeMax} أعضاء</div>
            <div className="flex items-center gap-2"><ClockIcon /> {hackathon.durationDays} يوم</div>
            <div className="flex items-center gap-2">
              <span className={`badge ${hackathon.registrationStatus === "مفتوح" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                {hackathon.registrationStatus}
              </span>
            </div>
          </div>

          {hackathon.description && (
            <div className="border-b border-navy-900/10 p-6">
              <h3 className="mb-2 text-sm font-extrabold text-navy-900">الوصف</h3>
              <p className="text-sm leading-7 text-navy-800/75">{hackathon.description}</p>
            </div>
          )}

          {hackathon.fields?.length > 0 && (
            <div className="border-b border-navy-900/10 p-6">
              <h3 className="mb-2 text-sm font-extrabold text-navy-900">المجالات</h3>
              <div className="flex flex-wrap gap-2">
                {hackathon.fields.map((f) => (
                  <span key={f} className="badge">{f}</span>
                ))}
              </div>
            </div>
          )}

          {hackathon.targetAudience && (
            <div className="p-6">
              <h3 className="mb-2 text-sm font-extrabold text-navy-900">الفئة المستهدفة</h3>
              <p className="text-sm text-navy-800/75">{hackathon.targetAudience}</p>
            </div>
          )}
        </div>

        {/* TEAMS */}
        <div className="mt-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-extrabold text-navy-900">الفرق المتاحة للانضمام</h3>
            {sessionUser?.role === "admin" && (
              <Link href={`/admin/teams?hackathon=${hackathon._id}`} className="btn-orange">
                أنشئ فريق جديد
              </Link>
            )}
          </div>

          {teams.length === 0 ? (
            <p className="text-sm text-navy-800/60">لا توجد فرق مفتوحة لهذا الهاكاثون بعد.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {teams.map((t) => (
                <TeamCard
                  key={t._id}
                  team={t}
                  currentUser={sessionUser}
                  initialIsMember={t.isMember}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
