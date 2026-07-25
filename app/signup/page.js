"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    adminKey: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(form.role === "admin" && form.adminKey ? { "x-admin-key": form.adminKey } : {}),
      },
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
        <h1 className="text-center text-2xl font-extrabold text-navy-900">إنشاء حساب</h1>
        <p className="mt-1 text-center text-sm text-navy-800/60">انضم إلى مجتمع ميدان</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label">الاسم الكامل</label>
            <input
              required
              className="input"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
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
            <label className="label">رقم الهاتف</label>
            <input
              className="input"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="label">كلمة المرور</label>
            <input
              type="password"
              required
              minLength={6}
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div>
            <label className="label">نوع الحساب</label>
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  checked={form.role === "user"}
                  onChange={() => setForm({ ...form, role: "user" })}
                />
                مستخدم
              </label>
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  checked={form.role === "admin"}
                  onChange={() => setForm({ ...form, role: "admin" })}
                />
                مشرف
              </label>
            </div>
          </div>

          {form.role === "admin" && (
            <div>
              <label className="label">رمز دعوة المشرف</label>
              <input
                className="input"
                value={form.adminKey}
                onChange={(e) => setForm({ ...form, adminKey: e.target.value })}
                placeholder="يوفره مسؤول المنصة"
              />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-orange w-full">
            {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-navy-800/70">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="font-bold text-brand-blue">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </main>
  );
}
