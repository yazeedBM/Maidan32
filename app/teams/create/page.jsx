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
 * "أنشئ إعلان" — hackathon summary, member-count select, then one card per
 * member (gender + role, skill inputs, notes) and the amber publish button
 * beside the outline cancel.
 *
 * The Figma frame presents this over a dimmed matching page; that is just
 * Figma showing context. It stays a real route here so deep links, the back
 * button and the existing navigation keep working.
 */
export default function CreateTeamAdPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hackathonId = searchParams.get("hackathon") ?? "1";
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
    // TODO: POST to the team-ads endpoint once the route exists.
    setSubmitted(true);
    setTimeout(() => router.push("/teams"), 900);
  }

  return (
    <>
      <Navbar variant="light" />
      <main className="flex-1 bg-white pb-16 pt-[120px]">
        <div className="container-site max-w-[880px]">
          {/* Title with the back link on its left, as one centred group */}
          <div className="mb-7 flex items-center justify-center gap-4">
            <h1 className="text-[30px] font-extrabold text-primary sm:text-[34px]">
              أنشئ إعلان
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
            <HackathonMiniCard teamAd={teamAd} />

            <div className="card p-6 text-right">
              <label htmlFor="member-count" className="field-label text-[15px]">
                عدد الأعضاء المطلوب :
              </label>
              <select
                id="member-count"
                value={memberCount}
                onChange={(e) => updateCount(Number(e.target.value))}
                className="field-select"
              >
                {Array.from({ length: MAX_MEMBERS }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {members.map((member, index) => {
              // Member 1 asks for four skills in the Figma, the rest for two.
              const skillSlots = index === 0 ? 4 : 2;
              return (
                <section
                  key={index}
                  aria-labelledby={`member-title-${index}`}
                  className="card p-6 text-right sm:p-7"
                >
                  <h2
                    id={`member-title-${index}`}
                    className="text-[22px] font-extrabold text-primary"
                  >
                    العضو رقم {index + 1}
                  </h2>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`gender-${index}`} className="field-label">
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

                  <h3 className="mt-6 text-[15px] font-extrabold text-accent">
                    المهارات المطلوبة
                  </h3>
                  <div className="mt-3 grid gap-5 sm:grid-cols-2">
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
                          onChange={(e) => updateSkill(index, s, e.target.value)}
                          className="field-input"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
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

            {/* Publish first → RTL keeps it on the right, cancel on the left */}
            <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row">
              <SubmitButton
                onClick={handlePublish}
                disabled={submitted}
                className="flex-1"
                size="lg"
              >
                {submitted ? "تم النشر بنجاح ✓" : "نشر الإعلان"}
              </SubmitButton>
              <OutlineBlueButton href="/teams" className="flex-1" size="lg">
                إلغاء
              </OutlineBlueButton>
            </div>
          </div>
        </div>
      </main>
      <Footer variant="light" />
    </>
  );
}
