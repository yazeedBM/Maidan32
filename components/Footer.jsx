import Link from "next/link";
import Logo from "./Logo";

const FOOTER_LINKS = [
  { href: "/contact", label: "تواصل معنا" },
  { href: "/teams", label: "أعثر على فريق" },
  { href: "/hackathons", label: "الهاكاثونات" },
  { href: "/", label: "الرئيسية" },
  { href: "/#about", label: "عن ميدان" },
];

/**
 * Site footer — wordmark on the left, link row on the right, hairline rule,
 * then the centred copyright line.
 *
 * variant="dark"  → near-black band (home, hackathons, matching pages)
 * variant="light" → pale blue band used behind the two form pages
 *
 * Note: the create-ad and join-request Figma frames still carry a leftover
 * English "Barakah Careers" footer from the source template. The real ميدان
 * footer is used on those pages instead, tinted to their light tone.
 */
export default function Footer({ variant = "dark" }) {
  const isDark = variant === "dark";

  return (
    <footer className={isDark ? "bg-dark-deep" : "bg-surface-footer"}>
      <div className="container-site py-10">
        {/* Links first → RTL places them right, wordmark left */}
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row-reverse md:justify-between">
          <nav aria-label="روابط التذييل">
            <ul className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-[13px] font-semibold transition-colors duration-150 hover:text-accent ${
                      isDark ? "text-white/85" : "text-primary/85"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/"
            aria-label="ميدان — الصفحة الرئيسية"
            className={isDark ? "text-white" : "text-primary"}
          >
            <Logo className="h-9 w-auto" />
          </Link>
        </div>

        <hr
          className={`my-8 border-t ${
            isDark ? "border-white/15" : "border-primary/15"
          }`}
        />

        <p
          className={`text-center text-[13px] font-medium ${
            isDark ? "text-white/60" : "text-primary/60"
          }`}
        >
          ميدان © تحفظ جميع حقوق النشر
        </p>
      </div>
    </footer>
  );
}
