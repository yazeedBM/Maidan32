"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import TeamCard from "./TeamCard";

export default function TeamsBrowser({ teams, currentUser }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teams;
    return teams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.hackathon?.title?.toLowerCase().includes(q) ||
        t.skillsNeeded?.some((s) => s.toLowerCase().includes(q))
    );
  }, [teams, query]);

  return (
    <div>
      <div className="mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن فريق أو هاكاثون أو مهارة..."
          className="input"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-navy-800/60">لا توجد فرق مطابقة لبحثك.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((t) => (
            <div key={t._id}>
              <Link
                href={`/hackathons/${t.hackathon?._id}`}
                className="mb-2 inline-block text-xs font-bold text-brand-blue hover:underline"
              >
                {t.hackathon?.title}
              </Link>
              <TeamCard team={t} currentUser={currentUser} initialIsMember={t.isMember} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
