"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/hackathons", label: "الهاكاثونات" },
  { href: "/teams", label: "أعثر على فريق" },
  { href: "/#about", label: "عن ميدان" },
];

export default function Navbar({ user, transparent = false }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header
      className={`sticky top-0 z-40 ${
        transparent ? "bg-navy-950/95 backdrop-blur" : "bg-navy-950"
      } border-b border-white/5`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-6">
        <Logo variant="light" />

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-semibold text-white/80 transition hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin/hackathons" className="text-sm font-semibold text-brand-orange">
                  لوحة المشرف
                </Link>
              )}
              <Link href="/profile" className="text-sm font-semibold text-white/80 hover:text-white">
                {user.fullName}
              </Link>
              <button onClick={handleLogout} className="btn-outline !py-2">
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-outline !py-2">
                تسجيل الدخول
              </Link>
              <Link href="/signup" className="btn-orange !py-2">
                إنشاء حساب
              </Link>
            </>
          )}
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="القائمة"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-semibold text-white/85" onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin/hackathons" className="btn-outline w-full">
                    لوحة المشرف
                  </Link>
                )}
                <Link href="/profile" className="btn-outline w-full">
                  {user.fullName}
                </Link>
                <button onClick={handleLogout} className="btn-orange w-full">
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-outline w-full">
                  تسجيل الدخول
                </Link>
                <Link href="/signup" className="btn-orange w-full">
                  إنشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
