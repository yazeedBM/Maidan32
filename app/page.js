import Link from "next/link";
import prisma from "@/lib/prisma";
import { serializeHackathon } from "@/lib/serialize";
import HackathonMiniCard from "@/components/HackathonMiniCard";
import Footer from "@/components/Footer";

async function getLatestHackathons() {
  const hackathons = await prisma.hackathon.findMany({
    orderBy: { date: "asc" },
    take: 6,
  });
  return hackathons.map(serializeHackathon);
}

export default async function HomePage() {
  const hackathons = await getLatestHackathons();

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #2456c9 0%, transparent 40%), radial-gradient(circle at 80% 60%, #f5a623 0%, transparent 35%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
          <div className="max-w-xl">
            <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              اكتشف الهاكاثونات، أعثر على فريقك <br className="hidden md:block" />
              و اصنع الأثر
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/teams" className="btn-outline">
                أعثر على فريق
              </Link>
              <Link href="/hackathons" className="btn-orange">
                اكتشف الهاكاثونات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6">
          <h2 className="text-2xl font-extrabold text-brand-blue md:text-3xl">عن ميدان</h2>
          <p className="mt-5 text-sm leading-8 text-navy-800/80 md:text-base">
            ميدان هو منصة تجمع الهاكاثونات والمشاركين في مكان واحد، لتسهّل عليك اكتشاف الفرص
            والمشاركة فيها. سواء كنت ترغب في إنشاء فرقة الخاص أو الانضمام إلى فريق قائم، ميدان
            يساعدك على العثور على الأشخاص الذين يشاركونك الشغف ومهاراتك المكملة لتحقيق أفضل نتاج.
          </p>
          <p className="mt-4 text-sm leading-8 text-navy-800/80 md:text-base">
            نسعى إلى بناء مجتمع يجمع الأفكار بالمواهب، ويجعل الوصول إلى الهاكاثونات والتعاون بين
            المشاركين أكثر سهولة، ليكون كل تحدٍ فرصة جديدة للتعلم والابتكار وصناعة الأثر.
          </p>
        </div>
      </section>

      {/* LATEST HACKATHONS */}
      <section className="bg-[#f7f8fa] py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-navy-900 md:text-3xl">أحدث الهاكاثونات</h2>
            <Link href="/hackathons" className="btn-orange">
              اكتشف جميع الهاكاثونات
            </Link>
          </div>

          {hackathons.length === 0 ? (
            <p className="text-sm text-navy-800/60">لا توجد هاكاثونات متاحة حالياً.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hackathons.map((h) => (
                <HackathonMiniCard key={h._id} hackathon={h} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
