import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import { HackathonStats } from "@/components/Chips";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import { BackArrowIcon } from "@/components/Icons";
import { HACKATHONS } from "@/lib/sampleData";

export function generateMetadata({ params }) {
  const h = HACKATHONS.find((x) => x.id === params.id);
  return { title: h ? h.title : "الهاكاثون" };
}

/**
 * Hackathon details page. NOTE: this screen has no dedicated Figma frame —
 * layout follows the established system (dark band header, white card,
 * stat chips, blue/orange CTAs). Adjust freely once a frame exists.
 */
export default function HackathonDetailsPage({ params }) {
  const hackathon = HACKATHONS.find((h) => h.id === params.id);
  if (!hackathon) notFound();

  return (
    <>
      <Navbar variant="dark" />
      <main className="flex-1 bg-surface-muted">
        {/* Dark header band */}
        <section className="bg-dark pb-14 pt-32">
          <div className="container-site">
            <Link
              href="/hackathons"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-accent"
            >
              <BackArrowIcon />
              عودة إلى الهاكاثونات
            </Link>
            <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
              {hackathon.title}
            </h1>
            <p className="mt-2 text-base font-semibold text-white/85">
              مجالات الهاكاثون: {hackathon.fields}
            </p>
          </div>
        </section>

        <div className="container-site -mt-6 pb-16">
          <div className="card p-6 sm:p-10">
            {/* Cover image — PLACEHOLDER */}
            <div className="h-56 w-full overflow-hidden rounded-card bg-primary-navy sm:h-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hackathon.image}
                alt={`صورة ${hackathon.title}`}
                className="h-full w-full object-cover"
              />
            </div>

            <HackathonStats
              duration={hackathon.duration}
              members={hackathon.members}
              prize={hackathon.prize}
              date={hackathon.date}
              location={hackathon.location}
              className="mt-8"
            />

            <h2 className="mt-8 text-2xl font-extrabold text-primary">
              عن الهاكاثون
            </h2>
            <p className="mt-3 max-w-3xl text-base font-medium leading-loose text-ink-soft">
              {hackathon.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <SecondaryButton href={`/teams?hackathon=${hackathon.id}`}>
                أعثر على فريق
              </SecondaryButton>
              <PrimaryButton href={`/teams/create?hackathon=${hackathon.id}`}>
                أنشئ فريقا!
              </PrimaryButton>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>
      <Footer variant="dark" />
    </>
  );
}