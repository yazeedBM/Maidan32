"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/hackathons", label: "الهاكاثونات" },
  { href: "/teams", label: "أعثر على فريق" },
  { href: "/#about", label: "عن ميدان" },
];

/**
 * Site navigation bar.
 *
 * variant="dark"  → transparent over dark hero images (homepage, hackathons):
 *                   white links, white logo wordmark.
 * variant="light" → over the light matching-page hero:
 *                   blue links, blue logo wordmark.
 *
 * Note: screenshots 1–2 show a Latin nav (Home / Hackathons / TeamMaker /
 * About) while screenshots 3–5 show the Arabic nav. The Arabic version is
 * used consistently here since it matches the final RTL pages.
 */
export default function Navbar({ variant = "dark" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isDark = variant === "dark";

  const linkBase =
    "text-base font-semibold transition-colors duration-150 py-1";
  const linkColor = isDark
    ? "text-white/90 hover:text-accent"
    : "text-primary hover:text-accent";
  const activeColor = "text-accent";

  return (
    <header
      className={`absolute inset-x-0 top-0 z-40 ${
        isDark ? "" : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-20 items-center justify-between">
        {/* Logo — sits on the right in RTL */}
        <Link href="/" aria-label="ميدان — الصفحة الرئيسية" className="shrink-0">
          <Logo tone={isDark ? "light" : "dark"} />
        </Link>

        {/* Desktop links */}
        <nav aria-label="التنقل الرئيسي" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.replace("/#about", "/x"));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${linkBase} ${
                      isActive ? activeColor : linkColor
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-field ${
            isDark ? "text-white" : "text-primary"
          }`}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="التنقل الرئيسي للجوال"
          className={`md:hidden mx-4 rounded-card p-4 shadow-card-lg ${
            isDark ? "bg-dark-soft" : "bg-white"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-field px-3 py-2.5 text-base font-semibold ${
                    isDark
                      ? "text-white/90 hover:bg-white/10"
                      : "text-primary hover:bg-surface-blue"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}