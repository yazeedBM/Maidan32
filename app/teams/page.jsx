import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import TeamsBrowser from "@/components/TeamsBrowser";
import { TEAM_ADS } from "@/lib/sampleData";

export const metadata = { title: "أعثر على فريق" };

export default function TeamsPage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="flex-1 bg-surface-blue">
        {/* Light hero — handshake photo fading into pale blue */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-top"
            /* PLACEHOLDER: /public/images/hero-teams.jpg — handshake photo */
            style={{ backgroundImage: "url('/images/hero-teams.jpg')" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-hero-overlay-light"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-surface-blue"
          />

          <div className="container-site relative flex min-h-[24rem] flex-col justify-center pb-16 pt-32">
            <h1 className="text-4xl font-extrabold text-primary sm:text-5xl">
              أعثر على فريق
            </h1>
            <p className="mt-4 max-w-md text-xl font-bold leading-relaxed text-primary-navy">
              ناقصك فريق ؟ أعثر على أشخاص يشاركونك الرحلة !
            </p>
          </div>
        </section>

        {/* Filters + results */}
        <div className="container-site pb-20">
          <TeamsBrowser teamAds={TEAM_ADS} />
        </div>

        <Newsletter />
      </main>
      <Footer variant="dark" />
    </>
  );
}