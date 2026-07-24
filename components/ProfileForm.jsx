"use client";

import { useState } from "react";

function emptyExperience() {
  return { title: "", description: "", year: "" };
}

export default function ProfileForm({ initialUser }) {
  const [fullName, setFullName] = useState(initialUser.fullName || "");
  const [phone, setPhone] = useState(initialUser.phone || "");
  const [bio, setBio] = useState(initialUser.profile?.bio || "");
  const [skills, setSkills] = useState(initialUser.profile?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState(initialUser.profile?.experience || []);
  const [links, setLinks] = useState(
    initialUser.profile?.links || { github: "", linkedin: "", portfolio: "" }
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function addSkill(e) {
    e.preventDefault();
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills([...skills, s]);
    setSkillInput("");
  }

  function removeSkill(s) {
    setSkills(skills.filter((x) => x !== s));
  }

  function updateExperience(idx, field, value) {
    setExperience((prev) =>
      prev.map((exp, i) => (i === idx ? { ...exp, [field]: value } : exp))
    );
  }

  function addExperience() {
    setExperience((prev) => [...prev, emptyExperience()]);
  }

  function removeExperience(idx) {
    setExperience((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        phone,
        profile: { bio, skills, experience, links },
      }),
    });
    setSaving(false);
    setMessage(res.ok ? "تم حفظ التغييرات بنجاح" : "تعذر حفظ التغييرات");
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Basic info */}
      <div className="card space-y-4 p-6">
        <h2 className="text-lg font-extrabold text-navy-900">المعلومات الأساسية</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">الاسم الكامل</label>
            <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="label">رقم الهاتف (يظهر لزملاء فريقك فقط)</label>
            <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="label">نبذة عني</label>
          <textarea
            className="input min-h-24"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="اكتب نبذة مختصرة عن نفسك وشغفك واهتماماتك..."
          />
        </div>
      </div>

      {/* Skills */}
      <div className="card space-y-4 p-6">
        <h2 className="text-lg font-extrabold text-navy-900">المهارات</h2>
        <div className="flex gap-2">
          <input
            className="input"
            placeholder="أضف مهارة (مثال: تصميم UX)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill(e)}
          />
          <button onClick={addSkill} className="btn-blue shrink-0">إضافة</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="badge gap-2">
              {s}
              <button type="button" onClick={() => removeSkill(s)} className="text-red-600">×</button>
            </span>
          ))}
          {skills.length === 0 && <p className="text-sm text-navy-800/50">لم تُضف أي مهارات بعد.</p>}
        </div>
      </div>

      {/* Experience */}
      <div className="card space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-navy-900">الخبرات</h2>
          <button type="button" onClick={addExperience} className="btn-outline-navy !py-1.5 !px-3 text-xs">
            + أضف خبرة
          </button>
        </div>

        {experience.length === 0 && (
          <p className="text-sm text-navy-800/50">لم تُضف أي خبرات بعد.</p>
        )}

        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div key={idx} className="rounded-lg border border-navy-900/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-navy-800/50">خبرة #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeExperience(idx)}
                  className="text-xs font-bold text-red-600"
                >
                  حذف
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  className="input"
                  placeholder="المسمى (مثال: مطور واجهات أمامية)"
                  value={exp.title}
                  onChange={(e) => updateExperience(idx, "title", e.target.value)}
                />
                <input
                  className="input"
                  placeholder="السنة (مثال: 2025)"
                  value={exp.year}
                  onChange={(e) => updateExperience(idx, "year", e.target.value)}
                />
              </div>
              <textarea
                className="input mt-3 min-h-16"
                placeholder="وصف مختصر للمهام والإنجازات"
                value={exp.description}
                onChange={(e) => updateExperience(idx, "description", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="card space-y-4 p-6">
        <h2 className="text-lg font-extrabold text-navy-900">روابط</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label">GitHub</label>
            <input
              className="input"
              value={links.github}
              onChange={(e) => setLinks({ ...links, github: e.target.value })}
            />
          </div>
          <div>
            <label className="label">LinkedIn</label>
            <input
              className="input"
              value={links.linkedin}
              onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Portfolio</label>
            <input
              className="input"
              value={links.portfolio}
              onChange={(e) => setLinks({ ...links, portfolio: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="btn-orange">
          {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
        {message && <span className="text-sm text-navy-800/70">{message}</span>}
      </div>
    </form>
  );
}
