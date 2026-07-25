"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminTeamsClient({ hackathons, initialTeams, preselectedHackathon }) {
  const router = useRouter();
  const [teams, setTeams] = useState(initialTeams);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    hackathon: preselectedHackathon || hackathons[0]?._id || "",
    name: "",
    description: "",
    skillsNeeded: "",
    maxMembers: 4,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      maxMembers: Number(form.maxMembers),
      skillsNeeded: form.skillsNeeded.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const res = await fetch("/api/teams", {
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

    const hackathonTitle = hackathons.find((h) => h._id === form.hackathon)?.title || "";
    setTeams((prev) => [
      { ...data.team, hackathon: { _id: form.hackathon, title: hackathonTitle }, members: [] },
      ...prev,
    ]);
    setForm({ ...form, name: "", description: "", skillsNeeded: "", maxMembers: 4 });
    router.refresh();
  }

  if (hackathons.length === 0) {
    return <p className="text-sm text-navy-800/60">أضف هاكاثوناً أولاً قبل إنشاء فرق.</p>;
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="card grid gap-4 p-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">الهاكاثون *</label>
          <select
            required
            className="input"
            value={form.hackathon}
            onChange={(e) => setForm({ ...form, hackathon: e.target.value })}
          >
            {hackathons.map((h) => (
              <option key={h._id} value={h._id}>{h.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">اسم الفريق *</label>
          <input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="label">الحد الأقصى للأعضاء</label>
          <input type="number" min={1} className="input" value={form.maxMembers} onChange={(e) => setForm({ ...form, maxMembers: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">وصف الفريق</label>
          <textarea className="input min-h-20" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">المهارات المطلوبة (افصل بفاصلة)</label>
          <input className="input" placeholder="React, تصميم UI" value={form.skillsNeeded} onChange={(e) => setForm({ ...form, skillsNeeded: e.target.value })} />
        </div>

        {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}

        <button type="submit" disabled={loading} className="btn-orange sm:col-span-2">
          {loading ? "جاري الإنشاء..." : "إنشاء الفريق"}
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="text-lg font-extrabold text-navy-900">الفرق الحالية</h2>
        {teams.length === 0 && <p className="text-sm text-navy-800/60">لا توجد فرق بعد.</p>}
        {teams.map((t) => (
          <div key={t._id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-extrabold text-navy-900">{t.name}</p>
              <p className="text-xs text-navy-800/60">
                {t.hackathon?.title} · {t.members?.length || 0}/{t.maxMembers} أعضاء
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
