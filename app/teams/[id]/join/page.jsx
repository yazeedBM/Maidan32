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
  phone: "+966",
  email: "",
  educationStatus: "",
  linkedin: "",
  currentSkills: "",
  pastExperience: "",
  notes: "",
};

/**
 * "طلب انضمام للفريق" — summary card for the slot being applied to, then the
 * "قم بتعبئة البيانات أدناه" form and the amber submit beside the cancel.
 */
export default function JoinTeamPage() {
  const router = useRouter();
  const params = useParams();
  const teamAd = TEAM_ADS.find((t) => t.id === params.id) ?? TEAM_ADS[1];

  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  function handleSubmit() {
    // TODO: POST to the join-requests endpoint once the route exists.
    setSubmitted(true);
    setTimeout(() => router.push("/teams"), 900);
  }

  return (
    <>
      <Navbar variant="light" />
      <main className="flex-1 bg-white pb-16 pt-[120px]">
        <div className="container-site max-w-[880px]">
          <div className="mb-7 flex items-center justify-center gap-4">
            <h1 className="text-[30px] font-extrabold text-primary sm:text-[34px]">
              طلب انضمام للفريق
            </h1>
            <Link
              href="/teams"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-soft transition-colors hover:text-primary"
            >
              عودة
              <BackArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-5">
            <HackathonMiniCard teamAd={teamAd} memberNumber={1} />

            <section
              aria-labelledby="join-form-title"
              className="card p-6 text-right sm:p-8"
            >
              <h2
                id="join-form-title"
                className="text-[22px] font-extrabold text-accent"
              >
                قم بتعبئة البيانات أدناه
              </h2>

              <div className="mt-7 space-y-5">
                {/* Inline row: label right, select filling the rest */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <label
                    htmlFor="memberNumber"
                    className="mb-0 shrink-0 text-[13px] font-bold text-primary"
                  >
                    أريد الانضمام كالعضو رقم :
                  </label>
                  <select
                    id="memberNumber"
                    value={form.memberNumber}
                    onChange={set("memberNumber")}
                    className="field-select flex-1"
                  >
                    <option value="">اختر</option>
                    {teamAd.members.map((m) => (
                      <option key={m.number} value={m.number}>
                        العضو رقم {m.number} — {m.role}
                      </option>
                    ))}
                  </select>
                </div>

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

                <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row">
                  <SubmitButton
                    onClick={handleSubmit}
                    disabled={submitted}
                    className="flex-1"
                    size="lg"
                  >
                    {submitted ? "تم إرسال الطلب ✓" : "إرسال الطلب"}
                  </SubmitButton>
                  <OutlineBlueButton href="/teams" className="flex-1" size="lg">
                    إلغاء
                  </OutlineBlueButton>
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
