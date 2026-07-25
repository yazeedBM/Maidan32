"use client";

import { SearchIcon } from "./Icons";

/**
 * Rounded search input from the matching page — magnifier sits at the far
 * left (end side in RTL), placeholder "ابحث عن هاكاثون".
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
        className="h-12 w-full rounded-field border border-surface-field bg-white pr-4 pl-12 text-sm text-ink shadow-chip placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <SearchIcon
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary"
        aria-hidden="true"
      />
    </div>
  );
}