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
        {/* Dark hero band with winners photo on the left */}
        <section className="relative isolate overflow-hidden bg-dark">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-full bg-cover bg-center sm:w-3/5"
            /* PLACEHOLDER: /public/images/hero-hackathons.jpg — winners
               lifting the trophy, masked with a diagonal fade in Figma */
            style={{
              backgroundImage: "url('/images/hero-hackathons.jpg')",
              maskImage:
                "linear-gradient(270deg, transparent 0%, black 35%)",
              WebkitMaskImage:
                "linear-gradient(270deg, transparent 0%, black 35%)",
            }}
          />
          <div className="container-site relative flex min-h-[22rem] flex-col justify-center pb-14 pt-32">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              الهاكاثونات
            </h1>
            <p className="mt-3 text-lg font-semibold text-white/90">
              شارك و أثبت أنك الأفضل!
            </p>
          </div>
        </section>

        {/* Featured banner overlapping content area */}
        <div className="container-site -mt-0 pt-10">
          <FeaturedHackathon hackathon={featured} />
        </div>

        {/* List */}
        <div className="container-site space-y-8 py-12">
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