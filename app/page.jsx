import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LatestHackathons from "@/components/LatestHackathons";
import ChampionsSection from "@/components/ChampionsSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { HACKATHONS } from "@/lib/sampleData";

export default function HomePage() {
  return (
    <>
      <Navbar variant="dark" />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <LatestHackathons hackathons={HACKATHONS} />
        <ChampionsSection />
        <Newsletter />
      </main>
      <Footer variant="dark" />
    </>
  );
}