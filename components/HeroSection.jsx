import Logo from "./Logo";
import { PrimaryButton, OutlineLightButton } from "./Buttons";

/**
 * Homepage hero — full-bleed photo behind a dark scrim that deepens toward
 * the right (RTL reading side), the large ميدان wordmark, a two-line
 * tagline, then the orange + outline CTA pair.
 */
export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-dark">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-home.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-hero-scrim" />

      <div className="container-site relative flex min-h-[560px] flex-col justify-center pb-24 pt-[168px]">
        <div className="animate-fade-up ms-auto max-w-[520px] text-right">
          <Logo className="ms-auto h-[76px] w-auto text-white sm:h-[113px]" />

          <p className="mt-7 text-[26px] font-semibold leading-[1.55] text-white sm:text-[30px]">
            اكتشف الهاكاثونات، أعثر على فريقك،
            <br />و اصنع الأثر
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-end gap-4">
            <OutlineLightButton href="/teams" size="lg">
              أعثر على فريق
            </OutlineLightButton>
            <PrimaryButton href="/hackathons" size="lg">
              اكتشف الهاكاثونات
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
