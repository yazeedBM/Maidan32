"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HackathonMiniCard from "@/components/HackathonMiniCard";
import { SubmitButton, OutlineBlueButton } from "@/components/Buttons";
import { BackArrowIcon } from "@/components/Icons";
import { TEAM_ADS, FILTER_OPTIONS } from "@/lib/sampleData";

const INITIAL_FORM = {
  memberNumber: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  educationStatus: "",
  linkedin: "",
  currentSkills: "",
  pastExperience: "",
  notes: "",
};

/**
 * Join-request page ("طلب انضمام للفريق") — hackathon summary card with the
 * targeted member slot, then the "قم بتعبئة البيانات أدناه" form: member
 * slot select, first/last name, phone (+966, LTR), email (LTR), education
 * status select, LinkedIn (LTR), current skills, past experience textarea,
 * notes, then amber "إرسال الطلب" + outline "إلغاء".
 */
export default function JoinTeamPage() {
  const router = useRouter();
  const params = useParams();
  const teamAd = TEAM_ADS.find((t) => t.id === params.id) ?? TEAM_ADS[1];

  const [form, setForm] = useState({ ...INITIAL_FORM, phone: "+966" });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  function handleSubmit() {
    // TODO: POST to the join-requests endpoint when the backend is ready.
    setSubmitted(true);
    setTimeout(() => router.push("/teams"), 900);
  }

  return (
    <>
      <Navbar variant="light" />
      <main className="flex-1 bg-surface-blue pb-20 pt-28">
        <div className="container-site max-w-3xl">
          {/* Title + back */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">
              طلب انضمام للفريق
            </h1>
            <Link
              href="/teams"
              className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft transition-colors hover:text-primary"
            >
              عودة
              <BackArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-6">
            {/* Summary with member 1 details, as in the frame */}
            <HackathonMiniCard teamAd={teamAd} memberNumber={1} />

            {/* Form card */}
            <section aria-labelledby="join-form-title" className="card p-6 sm:p-10">
              <h2
                id="join-form-title"
                className="text-2xl font-extrabold text-accent"
              >
                قم بتعبئة البيانات أدناه
              </h2>

              <div className="mt-8 space-y-6">
                {/* Member slot */}
                <div>
                  <label htmlFor="memberNumber" className="field-label">
                    أريد الانضمام كالعضو رقم :
                  </label>
                  <select
                    id="memberNumber"
                    value={form.memberNumber}
                    onChange={set("memberNumber")}
                    className="field-select"
                  >
                    <option value="">اختر</option>
                    {teamAd.members.map((m) => (
                      <option key={m.number} value={m.number}>
                        العضو رقم {m.number} — {m.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Names */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="field-label">
                      الاسم الأول
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={set("firstName")}
                      className="field-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="field-label">
                      الاسم الأخير
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={set("lastName")}
                      className="field-input"
                    />
                  </div>
                </div>

                {/* Phone + email — LTR values */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="field-label">
                      رقم الهاتف
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      className="field-input dir-ltr"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label">
                      البريد الإلكتروني
                    </label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={set("email")}
                      className="field-input dir-ltr"
                    />
                  </div>
                </div>

                {/* Education + LinkedIn */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="educationStatus" className="field-label">
                      الحالة الدراسية
                    </label>
                    <select
                      id="educationStatus"
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
                    <label htmlFor="linkedin" className="field-label">
                      حساب Linkedin (إن وجد)
                    </label>
                    <input
                      id="linkedin"
                      type="url"
                      inputMode="url"
                      placeholder="linkedin.com/in/yourprofile"
                      value={form.linkedin}
                      onChange={set("linkedin")}
                      className="field-input dir-ltr"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label htmlFor="currentSkills" className="field-label">
                    المهارات الحالية
                  </label>
                  <input
                    id="currentSkills"
                    type="text"
                    value={form.currentSkills}
                    onChange={set("currentSkills")}
                    className="field-input"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="pastExperience" className="field-label">
                    الخبرات السابقة
                  </label>
                  <textarea
                    id="pastExperience"
                    placeholder="أخبرنا عن خبراتك ومشاركاتك السابقة"
                    value={form.pastExperience}
                    onChange={set("pastExperience")}
                    className="field-textarea"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="field-label">
                    ملاحظات إضافية
                  </label>
                  <input
                    id="notes"
                    type="text"
                    value={form.notes}
                    onChange={set("notes")}
                    className="field-input"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row">
                  <OutlineBlueButton href="/teams" className="flex-1">
                    إلغاء
                  </OutlineBlueButton>
                  <SubmitButton
                    onClick={handleSubmit}
                    disabled={submitted}
                    className="flex-1"
                  >
                    {submitted ? "تم إرسال الطلب ✓" : "إرسال الطلب"}
                  </SubmitButton>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer variant="light" />
    </>
  );
}