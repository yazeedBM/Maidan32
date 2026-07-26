"use client";

import { useState } from "react";
import { SubmitButton, OutlineBlueButton } from "./Buttons";
import { FILTER_OPTIONS } from "@/lib/sampleData";

/**
 * Profile edit form styled to the design system (same field styles as the
 * join-request form). Accepts an optional `user` object to prefill.
 * NOTE: no Figma frame exists for profile — extended from the system.
 */
export default function ProfileForm({ user = {} }) {
  const [form, setForm] = useState({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "+966",
    educationStatus: user.educationStatus ?? "",
    linkedin: user.linkedin ?? "",
    skills: user.skills ?? "",
    bio: user.bio ?? "",
  });
  const [saved, setSaved] = useState(false);

  const set = (key) => (e) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  function handleSave() {
    // TODO: PATCH to your profile endpoint.
    setSaved(true);
  }

  return (
    <div className="card p-6 sm:p-10">
      <h2 className="text-2xl font-extrabold text-accent">البيانات الشخصية</h2>

      <div className="mt-8 space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="pf-first" className="field-label">
              الاسم الأول
            </label>
            <input
              id="pf-first"
              type="text"
              value={form.firstName}
              onChange={set("firstName")}
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="pf-last" className="field-label">
              الاسم الأخير
            </label>
            <input
              id="pf-last"
              type="text"
              value={form.lastName}
              onChange={set("lastName")}
              className="field-input"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="pf-email" className="field-label">
              البريد الإلكتروني
            </label>
            <input
              id="pf-email"
              type="email"
              value={form.email}
              onChange={set("email")}
              className="field-input dir-ltr"
            />
          </div>
          <div>
            <label htmlFor="pf-phone" className="field-label">
              رقم الهاتف
            </label>
            <input
              id="pf-phone"
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              className="field-input dir-ltr"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="pf-edu" className="field-label">
              الحالة الدراسية
            </label>
            <select
              id="pf-edu"
              value={form.educationStatus}
              onChange={set("educationStatus")}
              className="field-select"
            >
              <option value="">اختر</option>
              {FILTER_OPTIONS.educationStatus.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pf-linkedin" className="field-label">
              حساب Linkedin (إن وجد)
            </label>
            <input
              id="pf-linkedin"
              type="url"
              placeholder="linkedin.com/in/yourprofile"
              value={form.linkedin}
              onChange={set("linkedin")}
              className="field-input dir-ltr"
            />
          </div>
        </div>

        <div>
          <label htmlFor="pf-skills" className="field-label">
            المهارات الحالية
          </label>
          <input
            id="pf-skills"
            type="text"
            value={form.skills}
            onChange={set("skills")}
            className="field-input"
          />
        </div>

        <div>
          <label htmlFor="pf-bio" className="field-label">
            نبذة عنك
          </label>
          <textarea
            id="pf-bio"
            placeholder="أخبرنا عن خبراتك ومشاركاتك السابقة"
            value={form.bio}
            onChange={set("bio")}
            className="field-textarea"
          />
        </div>

        <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row">
          <OutlineBlueButton href="/" className="flex-1">
            إلغاء
          </OutlineBlueButton>
          <SubmitButton onClick={handleSave} className="flex-1">
            {saved ? "تم الحفظ ✓" : "حفظ التغييرات"}
          </SubmitButton>
        </div>
      </div>
    </div>
  );
}