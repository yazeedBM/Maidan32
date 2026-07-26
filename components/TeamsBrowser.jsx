"use client";

import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import TeamCard from "./TeamCard";
import { ChevronDownIcon } from "./Icons";

const EMPTY_FILTERS = { gender: "", field: "", skills: "", region: "" };

/**
 * Client shell for the matching page. The filter rail is first in DOM so RTL
 * places it on the right; the results column (search, count + sort, cards)
 * follows on the left. Search and filtering stay client-side, exactly as
 * before — only the presentation changed.
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
    if (filters.field)
      list = list.filter(
        (t) =>
          filters.field.includes(t.category) || t.category.includes(filters.field)
      );
    if (filters.skills)
      list = list.filter((t) =>
        t.members.some((m) =>
          m.skills.some(
            (s) => filters.skills.includes(s) || s.includes(filters.skills)
          )
        )
      );
    if (filters.region) list = list.filter((t) => t.location === filters.region);

    if (sort === "oldest") list.reverse();
    return list;
  }, [teamAds, query, filters, sort]);

  return (
    <div className="flex flex-col gap-7 lg:flex-row">
      <FilterSidebar
        filters={filters}
        onChange={(key, value) =>
          setFilters((prev) => ({ ...prev, [key]: value }))
        }
        onClear={() => setFilters(EMPTY_FILTERS)}
      />

      <div className="min-w-0 flex-1">
        <SearchBar value={query} onChange={setQuery} />

        {/* Count right, sort left */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-[19px] font-extrabold text-primary">
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
              className="h-10 w-[220px] cursor-pointer appearance-none rounded-field border border-black/[0.06] bg-white pl-9 pr-4 text-center text-[13px] font-semibold text-ink-soft shadow-chip focus:border-primary focus:outline-none"
            >
              <option value="latest">الأحدث</option>
              <option value="oldest">الأقدم</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          </div>
        </div>

        <div className="mt-5 space-y-6">
          {results.length > 0 ? (
            results.map((t) => <TeamCard key={t.id} teamAd={t} />)
          ) : (
            <div className="card p-10 text-center">
              <p className="text-[17px] font-bold text-primary">
                لا توجد نتائج مطابقة
              </p>
              <p className="mt-2 text-[13px] font-medium text-ink-soft">
                جرّب تعديل الفلاتر أو البحث بكلمات مختلفة
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
