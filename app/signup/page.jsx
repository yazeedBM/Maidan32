"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SubmitButton } from "@/components/Buttons";
import { FILTER_OPTIONS } from "@/lib/sampleData";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+966",
    gender: "",
    password: "",
  });
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  function handleSignup() {
    // TODO: wire to your auth endpoint.
  }

  return (
    <>
      <Navbar variant="light" />
      <main className="flex flex-1 items-center bg-surface-blue py-28">
        <div className="container-site max-w-xl">
          <div className="card p-8 sm:p-10">
            <h1 className="text-center text-3xl font-extrabold text-primary">
              إنشاء حساب
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-ink-soft">
              انضم إلى ميدان و ابدأ رحلتك
            </p>

            <div className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="su-first" className="field-label">
                    الاسم الأول
                  </label>
                  <input
                    id="su-first"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={set("firstName")}
                    className="field-input"
                  />
                </div>
                <div>
                  <label htmlFor="su-last" className="field-label">
                    الاسم الأخير
                  </label>
                  <input
                    id="su-last"
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={set("lastName")}
                    className="field-input"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="su-email" className="field-label">
                    البريد الإلكتروني
                  </label>
                  <input
                    id="su-email"
                    type="email"
                    autoComplete="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={set("email")}
                    className="field-input dir-ltr"
                  />
                </div>
                <div>
                  <label htmlFor="su-phone" className="field-label">
                    رقم الهاتف
                  </label>
                  <input
                    id="su-phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    className="field-input dir-ltr"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="su-gender" className="field-label">
                  الجنس
                </label>
                <select
                  id="su-gender"
                  value={form.gender}
                  onChange={set("gender")}
                  className="field-select"
                >
                  <option value="">اختر</option>
                  {FILTER_OPTIONS.gender.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="su-password" className="field-label">
                  كلمة المرور
                </label>
                <input
                  id="su-password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={set("password")}
                  className="field-input dir-ltr"
                />
              </div>

              <SubmitButton onClick={handleSignup} fullWidth>
                إنشاء الحساب
              </SubmitButton>

              <p className="text-center text-sm font-medium text-ink-soft">
                لديك حساب بالفعل؟{" "}
                <Link
                  href="/login"
                  className="font-bold text-accent hover:text-accent-light"
                >
                  سجّل الدخول
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer variant="light" />
    </>
  );
}