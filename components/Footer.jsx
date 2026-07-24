"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <>
      <section className="bg-navy-900">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center md:px-6">
          <h3 className="text-2xl font-extrabold text-white md:text-3xl">
            لا تفوت أي <span className="text-brand-orange">فرصة</span>
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60">
            ابق مطلعاً على كل ما يخص ميدان و الهاكاثونات المتوفرة و القادمة عبر
            الاشتراك بخدمة الرسائل الإلكترونية مجاناً
          </p>
          <form
            className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="ادخل بريدك الإلكتروني هنا"
              className="input flex-1"
              required
            />
            <button type="submit" className="btn-blue shrink-0">
              اشترك
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-navy-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:px-6">
          <Logo variant="light" />
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <li>
              <Link href="/#about" className="hover:text-white">عن ميدان</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">الرئيسية</Link>
            </li>
            <li>
              <Link href="/hackathons" className="hover:text-white">الهاكاثونات</Link>
            </li>
            <li>
              <Link href="/teams" className="hover:text-white">أعثر على فريق</Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-white">تواصل معنا</Link>
            </li>
          </ul>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
          ميدان © جميع حقوق النشر محفوظة
        </div>
      </footer>
    </>
  );
}
