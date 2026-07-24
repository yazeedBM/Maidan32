"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UsersIcon } from "./Icons";

export default function TeamCard({ team, currentUser, initialIsMember }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMember, setIsMember] = useState(initialIsMember);
  const [members, setMembers] = useState(team.members || []);

  const isFull = members.length >= team.maxMembers;

  async function handleJoin() {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch(`/api/teams/${team._id}/join`, { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "تعذر الانضمام إلى الفريق");
      return;
    }
    setIsMember(true);
    setMembers((prev) => [...prev, { _id: currentUser.id, fullName: currentUser.fullName }]);
    router.refresh();
  }

  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-base font-extrabold text-navy-900">{team.name}</h4>
        <span
          className={`badge ${
            isFull ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isFull ? "مكتمل" : "متاح"}
        </span>
      </div>

      {team.description && (
        <p className="mb-3 text-sm leading-6 text-navy-800/70">{team.description}</p>
      )}

      {team.skillsNeeded?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {team.skillsNeeded.map((s) => (
            <span key={s} className="badge">{s}</span>
          ))}
        </div>
      )}

      <div className="mb-4 flex items-center gap-1.5 text-xs text-navy-800/60">
        <UsersIcon /> {members.length} / {team.maxMembers} أعضاء
      </div>

      {members.length > 0 && (
        <ul className="mb-4 space-y-1 text-sm text-navy-800/80">
          {members.map((m) => (
            <li key={m._id} className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{m.fullName}</span>
              {isMember && (m.email || m.phone) && (
                <span className="text-xs text-navy-800/50">
                  {m.email} {m.phone && `· ${m.phone}`}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mb-3 text-xs text-red-600">{error}</p>}

      {isMember ? (
        <span className="btn-outline-navy w-full cursor-default border-emerald-500/40 text-emerald-700">
          أنت عضو في هذا الفريق
        </span>
      ) : (
        <button
          onClick={handleJoin}
          disabled={loading || isFull}
          className="btn-blue w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFull ? "الفريق مكتمل" : loading ? "جاري الانضمام..." : "انضم للفريق"}
        </button>
      )}
    </div>
  );
}
