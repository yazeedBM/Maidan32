"use client";

import { SearchIcon } from "./Icons";

/**
 * Rounded search field from the matching page. The blue magnifier sits at
 * the far right (the start side in RTL) with the placeholder beside it.
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "ابحث عن هاكاثون",
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor="team-search" className="sr-only">
        {placeholder}
      </label>
      <input
        id="team-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[52px] w-full rounded-field border border-black/[0.06] bg-white pl-4 pr-12 text-[13px] font-medium text-ink shadow-chip placeholder:font-normal placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <SearchIcon
        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-light"
        aria-hidden="true"
      />
    </div>
  );
}
