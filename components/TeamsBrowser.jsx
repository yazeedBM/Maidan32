"use client";

import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import TeamCard from "./TeamCard";
import { ChevronDownIcon } from "./Icons";

const EMPTY_FILTERS = { gender: "", field: "", skills: "", region: "" };

/**
 * Client shell for the matching page: sidebar filters (right), then search
 * bar, sort select ("الأحدث") + result count, and the team-ad card list.
 *
 * Receives `teamAds` from the server page; filtering/search run client-side.
 */
export default function TeamsBrowser({ teamAds = [] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const results = useMemo(() => {
    let list = [...teamAds];

    const q = query.trim();
    if (q) {
      list = list.filter(
        (t) =>
          t.hackathonTitle.includes(q) ||
          t.category.includes(q) ||
          t.members.some(
            (m) => m.role.includes(q) || m.skills.some((s) => s.includes(q))
          )
      );
    }

    if (filters.gender)
      list = list.filter((t) =>
        t.members.some((m) => m.gender === filters.gender)
      );
    if (filters.field) list = list.filter((t) => filters.field.includes(t.category) || t.category.includes(filters.field));
    if (filters.skills)
      list = list.filter((t) =>
        t.members.some((m) =>
          m.skills.some((s) => filters.skills.includes(s) || s.includes(filters.skills))
        )
      );
    if (filters.region) list = list.filter((t) => t.location === filters.region);

    if (sort === "oldest") list.reverse();
    return list;
  }, [teamAds, query, filters, sort]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Sidebar — right column in RTL */}
      <FilterSidebar
        filters={filters}
        onChange={(key, value) =>
          setFilters((prev) => ({ ...prev, [key]: value }))
        }
        onClear={() => setFilters(EMPTY_FILTERS)}
      />

      {/* Results column */}
      <div className="min-w-0 flex-1">
        <SearchBar value={query} onChange={setQuery} />

        {/* Count + sort */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-lg font-extrabold text-primary">
            {results.length} نتيجة
          </p>
          <div className="relative">
            <label htmlFor="sort" className="sr-only">
              ترتيب النتائج
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 appearance-none rounded-field border border-surface-field bg-white pl-9 pr-4 text-sm font-semibold text-ink-soft shadow-chip focus:border-primary focus:outline-none"
            >
              <option value="latest">الأحدث</option>
              <option value="oldest">الأقدم</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-6 space-y-6">
          {results.length > 0 ? (
            results.map((t) => <TeamCard key={t.id} teamAd={t} />)
          ) : (
            <div className="card p-10 text-center">
              <p className="text-lg font-bold text-primary">
                لا توجد نتائج مطابقة
              </p>
              <p className="mt-2 text-sm font-medium text-ink-soft">
                جرّب تعديل الفلاتر أو البحث بكلمات مختلفة
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}