import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import TeamsBrowser from "@/components/TeamsBrowser";
import { TEAM_ADS } from "@/lib/sampleData";

export const metadata = { title: "أعثر على فريق" };

export default function TeamsPage() {
  return (
    <>
      <Navbar variant="dark" />
      <main className="flex-1 bg-white">
        {/* Blue hero — handshake photo behind a deep blue scrim */}
        <section className="relative isolate overflow-hidden bg-[#0C4893]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-teams.jpg')" }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-hero-scrim-blue" />

          <div className="container-site relative flex min-h-[300px] flex-col justify-center pb-14 pt-[150px] text-right">
            <h1 className="text-[40px] font-extrabold text-white sm:text-[48px]">
              أعثر على فريق
            </h1>
            <p className="ms-auto mt-3 max-w-[420px] text-[19px] font-bold leading-relaxed text-white/95">
              ناقصك فريق ؟ أعثر على أشخاص يشاركونك الرحلة !
            </p>
          </div>
        </section>

        <div className="container-site py-10 pb-20">
          <TeamsBrowser teamAds={TEAM_ADS} />
        </div>

        <Newsletter />
      </main>
      <Footer variant="dark" />
    </>
  );
}
