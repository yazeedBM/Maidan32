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
 * Site footer.
 *
 * variant="dark"  → near-black footer used on homepage, hackathons and
 *                   matching pages (logo + link row + copyright divider).
 * variant="light" → soft blue-gray footer used behind the form pages
 *                   (create ad / join request).
 *
 * Note: the Figma frames for the two form screens contain an English
 * "Barakah Careers" footer left over from another template. The real brand
 * footer (ميدان) from the other three screens is used consistently instead,
 * restyled to the light tone those frames use.
 */
export default function Footer({ variant = "dark" }) {
  const isDark = variant === "dark";

  return (
    <footer
      className={
        isDark ? "bg-dark text-white" : "bg-surface-footer text-primary"
      }
    >
      <div className="container-site py-10">
        {/* Top row: logo + links */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link href="/" aria-label="ميدان — الصفحة الرئيسية">
            <Logo tone={isDark ? "light" : "dark"} />
          </Link>

          <nav aria-label="روابط التذييل">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm font-semibold transition-colors duration-150 ${
                      isDark
                        ? "text-white/85 hover:text-accent"
                        : "text-primary/85 hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <hr
          className={`my-8 border-t ${
            isDark ? "border-white/15" : "border-primary/15"
          }`}
        />

        {/* Copyright */}
        <p
          className={`text-center text-sm font-medium ${
            isDark ? "text-white/60" : "text-primary/60"
          }`}
        >
          ميدان © تحفظ جميع حقوق النشر
        </p>
      </div>
    </footer>
  );
}