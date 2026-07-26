"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { MenuIcon, CloseIcon } from "./Icons";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/hackathons", label: "الهاكاثونات" },
  { href: "/teams", label: "أعثر على فريق" },
  { href: "/#about", label: "عن ميدان" },
];

/**
 * Site navigation.
 *
 * In every Figma frame the wordmark sits on the LEFT edge and the links on
 * the RIGHT — so inside the RTL container the nav is placed first in DOM
 * order and the logo last, which flips them to the correct visual sides.
 *
 * variant="dark"  → transparent over the dark hero (home, hackathons)
 * variant="light" → over the blue matching-page hero
 * variant="solid" → opaque blue bar for the form pages
 */
export default function Navbar({ variant = "dark" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";

  const onDark = variant !== "light";

  const linkColor = onDark
    ? "text-white/90 hover:text-accent"
    : "text-primary hover:text-accent";

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container-site flex h-[88px] items-center justify-between">
        {/* Links — first in DOM so RTL places them on the right */}
        <nav aria-label="التنقل الرئيسي" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                  ? false
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-[19px] font-semibold leading-none transition-colors duration-150 ${
                      isActive ? "text-accent" : linkColor
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile toggle — also right side */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-field ${
            onDark ? "text-white" : "text-primary"
          }`}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Wordmark — last in DOM so RTL places it on the left */}
        <Link
          href="/"
          aria-label="ميدان — الصفحة الرئيسية"
          className={`shrink-0 ${onDark ? "text-white" : "text-primary"}`}
        >
          <Logo className="h-[38px] w-auto sm:h-[47px]" />
        </Link>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="التنقل الرئيسي للجوال"
          className={`md:hidden mx-5 rounded-card p-3 shadow-card-lg ${
            onDark ? "bg-dark" : "bg-white"
          }`}
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-field px-3 py-2.5 text-[15px] font-semibold ${
                    onDark
                      ? "text-white/90 hover:bg-white/10"
                      : "text-primary hover:bg-primary/5"
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
