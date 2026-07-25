"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HackathonMiniCard from "@/components/HackathonMiniCard";
import { SubmitButton, OutlineBlueButton } from "@/components/Buttons";
import { BackArrowIcon } from "@/components/Icons";
import { TEAM_ADS, FILTER_OPTIONS } from "@/lib/sampleData";

const MAX_MEMBERS = 4;

function emptyMember() {
  return { gender: "", role: "", skills: ["", "", "", ""], notes: "" };
}

/**
 * Create team ad page ("أنشئ إعلان") — hackathon summary card on top,
 * member-count select, then one white card per member with gender select,
 * role input, 4 skill inputs (member 1 shows 4, others show 2 per the
 * design — rendered as: first member 4 skills, rest 2), notes, and the
 * amber "نشر الإعلان" + outline "إلغاء" buttons.
 */
export default function CreateTeamAdPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hackathonId = searchParams.get("hackathon") ?? "1";
  // Summary card reuses the team-ad shape; falls back to the first entry.
  const teamAd =
    TEAM_ADS.find((t) => t.hackathonId === hackathonId) ?? TEAM_ADS[1];

  const [memberCount, setMemberCount] = useState(2);
  const [members, setMembers] = useState([emptyMember(), emptyMember()]);
  const [submitted, setSubmitted] = useState(false);

  function updateCount(count) {
    setMemberCount(count);
    setMembers((prev) => {
      const next = [...prev];
      while (next.length < count) next.push(emptyMember());
      return next.slice(0, count);
    });
  }

  function updateMember(index, patch) {
    setMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, ...patch } : m))
    );
  }

  function updateSkill(index, skillIndex, value) {
    setMembers((prev) =>
      prev.map((m, i) => {
        if (i !== index) return m;
        const skills = [...m.skills];
        skills[skillIndex] = value;
        return { ...m, skills };
      })
    );
  }

  function handlePublish() {
    // TODO: POST to the team-ads endpoint when the backend route is ready.
    setSubmitted(true);
    setTimeout(() => router.push("/teams"), 900);
  }

  return (
    <>
      <Navbar variant="light" />
      <main className="flex-1 bg-surface-blue pb-20 pt-28">
        <div className="container-site max-w-3xl">
          {/* Page title + back link */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">
              أنشئ إعلان
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
            {/* Hackathon summary */}
            <HackathonMiniCard teamAd={teamAd} />

            {/* Member count */}
            <div className="card p-6">
              <label
                htmlFor="member-count"
                className="field-label text-base"
              >
                عدد الأعضاء المطلوب :
              </label>
              <select
                id="member-count"
                value={memberCount}
                onChange={(e) => updateCount(Number(e.target.value))}
                className="field-select"
              >
                {Array.from({ length: MAX_MEMBERS }, (_, i) => i + 1).map(
                  (n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Member cards */}
            {members.map((member, index) => {
              const skillSlots = index === 0 ? 4 : 2;
              return (
                <section
                  key={index}
                  aria-labelledby={`member-title-${index}`}
                  className="card p-6 sm:p-8"
                >
                  <h2
                    id={`member-title-${index}`}
                    className="text-2xl font-extrabold text-primary"
                  >
                    العضو رقم {index + 1}
                  </h2>

                  {/* Gender + role */}
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`gender-${index}`}
                        className="field-label"
                      >
                        الجنس
                      </label>
                      <select
                        id={`gender-${index}`}
                        value={member.gender}
                        onChange={(e) =>
                          updateMember(index, { gender: e.target.value })
                        }
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
                      <label htmlFor={`role-${index}`} className="field-label">
                        الدور
                      </label>
                      <input
                        id={`role-${index}`}
                        type="text"
                        value={member.role}
                        onChange={(e) =>
                          updateMember(index, { role: e.target.value })
                        }
                        className="field-input"
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <h3 className="mt-7 text-base font-extrabold text-accent">
                    المهارات المطلوبة
                  </h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    {Array.from({ length: skillSlots }, (_, s) => (
                      <div key={s}>
                        <label
                          htmlFor={`skill-${index}-${s}`}
                          className="field-label"
                        >
                          مهارة {s + 1}
                        </label>
                        <input
                          id={`skill-${index}-${s}`}
                          type="text"
                          value={member.skills[s]}
                          onChange={(e) =>
                            updateSkill(index, s, e.target.value)
                          }
                          className="field-input"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  <div className="mt-6">
                    <label htmlFor={`notes-${index}`} className="field-label">
                      ملاحظات إضافية
                    </label>
                    <input
                      id={`notes-${index}`}
                      type="text"
                      value={member.notes}
                      onChange={(e) =>
                        updateMember(index, { notes: e.target.value })
                      }
                      className="field-input"
                    />
                  </div>
                </section>
              );
            })}

            {/* Actions: amber publish (right) + outline cancel (left) */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              <OutlineBlueButton href="/teams" className="flex-1">
                إلغاء
              </OutlineBlueButton>
              <SubmitButton
                onClick={handlePublish}
                disabled={submitted}
                className="flex-1"
              >
                {submitted ? "تم النشر بنجاح ✓" : "نشر الإعلان"}
              </SubmitButton>
            </div>
          </div>
        </div>
      </main>
      <Footer variant="light" />
    </>
  );
}