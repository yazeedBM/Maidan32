"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const emptyForm = {
  title: "",
  organizer: "",
  description: "",
  fields: "",
  location: "عن بعد",
  date: "",
  durationDays: 2,
  prize: 0,
  teamSizeMin: 1,
  teamSizeMax: 4,
  registrationStatus: "مفتوح",
  targetAudience: "",
  officialUrl: "",
};

export default function AdminHackathonsClient({ initialHackathons }) {
  const router = useRouter();
  const [hackathons, setHackathons] = useState(initialHackathons);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      fields: form.fields
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      durationDays: Number(form.durationDays),
      prize: Number(form.prize),
      teamSizeMin: Number(form.teamSizeMin),
      teamSizeMax: Number(form.teamSizeMax),
    };

    const res = await fetch("/api/hackathons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "حدث خطأ");
      return;
    }

    setHackathons((prev) => [...prev, data.hackathon]);
    setForm(emptyForm);
    setShowForm(false);
    router.refresh();
  }

  async function handleDelete(id) {
    if (!confirm("هل أنت متأكد من حذف هذا الهاكاثون؟ سيتم حذف جميع الفرق المرتبطة به.")) return;
    const res = await fetch(`/api/hackathons/${id}`, { method: "DELETE" });
    if (res.ok) {
      setHackathons((prev) => prev.filter((h) => h._id !== id));
      router.refresh();
    }
  }

  return (
    <div className="space-y-8">
      <button onClick={() => setShowForm((v) => !v)} className="btn-orange">
        {showForm ? "إلغاء" : "+ إضافة هاكاثون جديد"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="card grid gap-4 p-6 sm:grid-cols-2">
          <div>
            <label className="label">اسم الهاكاثون *</label>
            <input required className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="label">الجهة المنظمة</label>
            <input className="input" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">الوصف</label>
            <textarea className="input min-h-20" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="label">المجالات (افصل بفاصلة)</label>
            <input className="input" placeholder="تجربة المستخدم, تحليل البيانات" value={form.fields} onChange={(e) => setForm({ ...form, fields: e.target.value })} />
          </div>
          <div>
            <label className="label">الموقع</label>
            <input className="input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div>
            <label className="label">تاريخ آخر موعد للتسجيل *</label>
            <input required type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div>
            <label className="label">مدة الهاكاثون (أيام)</label>
            <input type="number" min={1} className="input" value={form.durationDays} onChange={(e) => setForm({ ...form, durationDays: e.target.value })} />
          </div>
          <div>
            <label className="label">الجائزة ($)</label>
            <input type="number" min={0} className="input" value={form.prize} onChange={(e) => setForm({ ...form, prize: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">حجم الفريق - الحد الأدنى</label>
              <input type="number" min={1} className="input" value={form.teamSizeMin} onChange={(e) => setForm({ ...form, teamSizeMin: e.target.value })} />
            </div>
            <div>
              <label className="label">حجم الفريق - الحد الأقصى</label>
              <input type="number" min={1} className="input" value={form.teamSizeMax} onChange={(e) => setForm({ ...form, teamSizeMax: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">حالة التسجيل</label>
            <select className="input" value={form.registrationStatus} onChange={(e) => setForm({ ...form, registrationStatus: e.target.value })}>
              <option value="مفتوح">مفتوح</option>
              <option value="مغلق">مغلق</option>
            </select>
          </div>
          <div>
            <label className="label">الفئة المستهدفة</label>
            <input className="input" value={form.targetAudience} onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">الرابط الرسمي *</label>
            <input required type="url" placeholder="https://" className="input" value={form.officialUrl} onChange={(e) => setForm({ ...form, officialUrl: e.target.value })} />
          </div>

          {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}

          <button type="submit" disabled={loading} className="btn-orange sm:col-span-2">
            {loading ? "جاري الإضافة..." : "إضافة الهاكاثون"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {hackathons.length === 0 && <p className="text-sm text-navy-800/60">لا توجد هاكاثونات بعد.</p>}
        {hackathons.map((h) => (
          <div key={h._id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-extrabold text-navy-900">{h.title}</p>
              <p className="text-xs text-navy-800/60">{h.organizer} · {new Date(h.date).toLocaleDateString("ar-SA")}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/hackathons/${h._id}`} className="btn-outline-navy !py-1.5 !px-3 text-xs">عرض</Link>
              <Link href={`/admin/teams?hackathon=${h._id}`} className="btn-blue !py-1.5 !px-3 text-xs">إدارة الفرق</Link>
              <button onClick={() => handleDelete(h._id)} className="btn !py-1.5 !px-3 bg-red-600 text-xs text-white hover:bg-red-700">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
