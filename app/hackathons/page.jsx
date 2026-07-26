import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import FeaturedHackathon from "@/components/FeaturedHackathon";
import HackathonCard from "@/components/HackathonCard";
import { HACKATHONS } from "@/lib/sampleData";

export const metadata = { title: "الهاكاثونات" };

export default function HackathonsPage() {
  const featured = HACKATHONS.find((h) => h.featured) ?? HACKATHONS[0];
  const rest = HACKATHONS.filter((h) => !h.featured);

  return (
    <>
      <Navbar variant="dark" />
      <main className="flex-1 bg-surface-muted">
        {/* Dark band — winners photo bleeds in from the left behind a fade */}
        <section className="relative isolate overflow-hidden bg-dark">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-full bg-cover bg-center sm:w-[62%]"
            style={{
              backgroundImage: "url('/images/hero-hackathons.jpg')",
              maskImage: "linear-gradient(270deg, transparent 2%, black 42%)",
              WebkitMaskImage: "linear-gradient(270deg, transparent 2%, black 42%)",
            }}
          />
          <div className="container-site relative flex min-h-[300px] flex-col justify-center pb-14 pt-[150px] text-right">
            <h1 className="text-[40px] font-extrabold text-white sm:text-[48px]">
              الهاكاثونات
            </h1>
            <p className="mt-2 text-[17px] font-semibold text-white/90">
              شارك و أثبت أنك الأفضل!
            </p>
          </div>
        </section>

        <div className="container-site pt-8">
          <FeaturedHackathon hackathon={featured} />
        </div>

        <div className="container-site space-y-6 py-8 pb-16">
          {rest.map((h) => (
            <HackathonCard key={h.id} hackathon={h} />
          ))}
        </div>

        <Newsletter />
      </main>
      <Footer variant="dark" />
    </>
  );
}
