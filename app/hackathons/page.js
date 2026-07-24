import prisma from "@/lib/prisma";
import { serializeHackathon } from "@/lib/serialize";
import { getSessionUser } from "@/lib/auth";
import HackathonCard from "@/components/HackathonCard";
import Footer from "@/components/Footer";

async function getHackathons() {
  const hackathons = await prisma.hackathon.findMany({ orderBy: { date: "asc" } });
  return hackathons.map(serializeHackathon);
}

export default async function HackathonsPage() {
  const hackathons = await getHackathons();
  const sessionUser = getSessionUser();

  return (
    <main>
      <section className="bg-navy-950 py-16 text-center">
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">الهاكاثونات</h1>
        <p className="mt-3 text-sm text-white/60 md:text-base">شارك و أثبت أنك الأفضل</p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <div className="flex flex-col gap-4">
          {hackathons.length === 0 ? (
            <p className="text-center text-sm text-navy-800/60">لا توجد هاكاثونات متاحة حالياً.</p>
          ) : (
            hackathons.map((h) => (
              <HackathonCard key={h._id} hackathon={h} isAdmin={sessionUser?.role === "admin"} />
            ))
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
