import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { serializeHackathon, serializeTeam } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";
import AdminTeamsClient from "@/components/AdminTeamsClient";

async function getData() {
  const hackathonsRaw = await prisma.hackathon.findMany({ orderBy: { date: "asc" } });
  const teamsRaw = await prisma.team.findMany({
    include: {
      hackathon: { select: { id: true, title: true, date: true, coverImage: true } },
      members: { include: { user: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return {
    hackathons: hackathonsRaw.map(serializeHackathon),
    teams: teamsRaw.map((t) => serializeTeam(t)),
  };
}

export default async function AdminTeamsPage({ searchParams }) {
  const sessionUser = getSessionUser();
  if (!sessionUser) redirect("/login");
  if (sessionUser.role !== "admin") redirect("/");

  const { hackathons, teams } = await getData();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <h1 className="mb-1 text-2xl font-extrabold text-navy-900">إدارة الفرق</h1>
      <p className="mb-8 text-sm text-navy-800/60">أنشئ فرقاً مفتوحة تحت أي هاكاثون ليتمكن المشاركون من الانضمام إليها</p>
      <AdminTeamsClient
        hackathons={hackathons}
        initialTeams={teams}
        preselectedHackathon={searchParams?.hackathon || ""}
      />
    </main>
  );
}
