"use client";

import { useState } from "react";

/**
 * "لا تفوت أي فرصة" — near-black band with a warm glow bleeding in from the
 * left. Headline (with "فرصة" in orange), two-line subtitle, then an email
 * field with an orange hairline beside the light-blue "اشترك" button.
 *
 * Presentational only: there is no newsletter endpoint in the API, so the
 * submit is validated and acknowledged client-side. Wire it up by replacing
 * the marked TODO — no other change is needed.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error

  function handleSubmit() {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    // TODO: POST to the newsletter endpoint once it exists.
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden bg-dark-deep py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-full w-[46%]"
        style={{
          background:
            "radial-gradient(60% 70% at 0% 35%, rgba(247,139,15,0.30) 0%, rgba(247,139,15,0) 70%)",
        }}
      />

      <div className="container-site relative flex flex-col items-center text-center">
        <h2
          id="newsletter-title"
          className="text-[34px] font-extrabold text-white sm:text-[42px]"
        >
          لا تفوت أي <span className="text-accent">فرصة</span>
        </h2>

        <p className="mt-5 text-[17px] font-medium leading-[1.9] text-white/90 sm:text-[18px]">
          ابق مطلعا على كل ما يخص ميدان و الهاكاثونات المتوفرة و القادمة
          <br className="hidden sm:block" />
          عبر الاشتراك بخدمة الرسائل الإلكترونية مجانا!
        </p>

        {/* Input first in DOM → sits right in RTL, button left, as in Figma */}
        <div className="mt-9 flex w-full max-w-[500px] flex-col gap-3 sm:flex-row sm:items-stretch">
          <label htmlFor="newsletter-email" className="sr-only">
            البريد الإلكتروني
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="ادخل عنوان بريدك الإلكتروني"
            className="h-12 flex-1 rounded-field border-2 border-accent bg-white px-4 text-center text-[13px] font-medium text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="h-12 shrink-0 rounded-field bg-primary-light px-8 text-[14px] font-bold text-white transition-colors duration-150 hover:bg-[#0A7FD6]"
          >
            اشترك
          </button>
        </div>

        <p
          role="status"
          aria-live="polite"
          className={`mt-3 min-h-[1.25rem] text-[13px] font-semibold ${
            status === "success"
              ? "text-accent"
              : status === "error"
              ? "text-red-400"
              : "text-transparent"
          }`}
        >
          {status === "success"
            ? "تم الاشتراك بنجاح، أهلا بك في ميدان!"
            : status === "error"
            ? "أدخل بريدا إلكترونيا صحيحا للاشتراك"
            : "\u00A0"}
        </p>
      </div>
    </section>
  );
}
