"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "حدث خطأ");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#f7f8fa] px-4 py-12">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-center text-2xl font-extrabold text-navy-900">تسجيل الدخول</h1>
        <p className="mt-1 text-center text-sm text-navy-800/60">مرحباً بعودتك إلى ميدان</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label">البريد الإلكتروني</label>
            <input
              type="email"
              required
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label">كلمة المرور</label>
            <input
              type="password"
              required
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-orange w-full">
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-navy-800/70">
          ليس لديك حساب؟{" "}
          <Link href="/signup" className="font-bold text-brand-blue">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </main>
  );
}
