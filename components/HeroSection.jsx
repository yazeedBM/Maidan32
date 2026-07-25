import Logo from "./Logo";
import { PrimaryButton, OutlineLightButton } from "./Buttons";

/**
 * Homepage dark hero — full-width photo behind a dark gradient, big brand
 * wordmark, two-line tagline, orange + outline CTAs.
 *
 * PLACEHOLDER: /public/images/hero-home.jpg — the photo of participants
 * around a whiteboard from the Figma homepage frame.
 */
export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-dark">
      {/* Background photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-home.jpg')" }}
      />
      {/* Dark overlay — heavier on the right where text sits (RTL) */}
      <div aria-hidden="true" className="absolute inset-0 bg-hero-overlay" />

      <div className="container-site relative flex min-h-[34rem] flex-col justify-center pb-16 pt-32">
        <div className="max-w-xl animate-fade-up">
          {/* Large brand wordmark, as in the design */}
          <Logo tone="light" className="scale-[1.8] origin-right mb-8" />

          <p className="mt-6 text-xl font-semibold leading-relaxed text-white sm:text-2xl">
            اكتشف الهاكاثونات، أعثر على فريقك،
            <br />و اصنع الأثر
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PrimaryButton href="/hackathons">اكتشف الهاكاثونات</PrimaryButton>
            <OutlineLightButton href="/teams">أعثر على فريق</OutlineLightButton>
          </div>
        </div>
      </div>
    </section>
  );
}