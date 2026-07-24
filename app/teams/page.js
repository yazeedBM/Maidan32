import prisma from "@/lib/prisma";
import { serializeTeam } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";
import Footer from "@/components/Footer";
import TeamsBrowser from "@/components/TeamsBrowser";

async function getTeams(currentUserId) {
  const teams = await prisma.team.findMany({
    include: {
      hackathon: { select: { id: true, title: true, date: true, coverImage: true } },
      members: { include: { user: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return teams.map((t) => serializeTeam(t, { currentUserId }));
}

export default async function TeamsPage() {
  const sessionUser = getSessionUser();
  const teams = await getTeams(sessionUser?.id);

  return (
    <main>
      <section className="bg-navy-950 py-14 text-center">
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">أعثر على فريق</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
          تنقصك فرقة أو أعثر على أشخاص لمشاركتك الرحلة!
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <TeamsBrowser teams={teams} currentUser={sessionUser} />
      </section>

      <Footer />
    </main>
  );
}
