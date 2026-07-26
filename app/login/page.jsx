"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SubmitButton } from "@/components/Buttons";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  function handleLogin() {
    // TODO: wire to your auth endpoint (backend untouched per project rules).
  }

  return (
    <>
      <Navbar variant="light" />
      <main className="flex flex-1 items-center bg-surface-blue py-28">
        <div className="container-site max-w-md">
          <div className="card p-8 sm:p-10">
            <h1 className="text-center text-3xl font-extrabold text-primary">
              تسجيل الدخول
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-ink-soft">
              أهلا بعودتك إلى ميدان
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label htmlFor="login-email" className="field-label">
                  البريد الإلكتروني
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={set("email")}
                  className="field-input dir-ltr"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="field-label">
                  كلمة المرور
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={set("password")}
                  className="field-input dir-ltr"
                />
              </div>

              <SubmitButton onClick={handleLogin} fullWidth>
                تسجيل الدخول
              </SubmitButton>

              <p className="text-center text-sm font-medium text-ink-soft">
                ليس لديك حساب؟{" "}
                <Link
                  href="/signup"
                  className="font-bold text-accent hover:text-accent-light"
                >
                  أنشئ حسابا
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