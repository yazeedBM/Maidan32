"use client";

import { useState } from "react";

/**
 * Dark newsletter band — "لا تفوت أي فرصة".
 *
 * Appears identically on the homepage, hackathons page and matching page:
 * near-black background with a subtle warm glow bottom-left, headline with
 * the word "فرصة" in orange, two-line subtitle, then an email input with an
 * orange focus ring next to a blue "اشترك" button.
 *
 * Purely presentational — submission is stubbed client-side until a backend
 * endpoint is wired up (per project rules, backend untouched).
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
    // TODO: POST to the newsletter endpoint when available.
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden bg-dark py-20 sm:py-24"
    >
      {/* Warm glow bottom-left, as in the screenshots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container-site relative flex flex-col items-center text-center">
        <h2
          id="newsletter-title"
          className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
        >
          لا تفوت أي <span className="text-accent">فرصة</span>
        </h2>

        <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 sm:text-lg">
          ابق مطلعا على كل ما يخص ميدان و الهاكاثونات المتوفرة و القادمة
          <br className="hidden sm:block" />
          عبر الاشتراك بخدمة الرسائل الإلكترونية مجانا!
        </p>

        {/* Email + subscribe — input first (right in RTL), button after (left) */}
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-stretch">
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
            className="dir-ltr h-12 flex-1 rounded-field border-2 border-accent bg-white px-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="h-12 shrink-0 rounded-field bg-primary-light px-7 text-sm font-bold text-white transition-colors duration-150 hover:bg-primary"
          >
            اشترك
          </button>
        </div>

        {/* Inline feedback */}
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 min-h-[1.25rem] text-sm font-semibold ${
            status === "success"
              ? "text-accent-light"
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