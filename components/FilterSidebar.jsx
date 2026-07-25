"use client";

import { FilterIcon } from "./Icons";
import { OutlineBlueButton, PrimaryButton } from "./Buttons";
import { FILTER_OPTIONS } from "@/lib/sampleData";

const FILTERS = [
  { key: "gender", label: "الجنس", labelColor: "text-accent", options: FILTER_OPTIONS.gender },
  { key: "field", label: "مجال الهاكاثون", labelColor: "text-accent", options: FILTER_OPTIONS.field },
  { key: "skills", label: "المهارات المطلوبة", labelColor: "text-accent", options: FILTER_OPTIONS.skills },
  { key: "region", label: "المنطقة", labelColor: "text-accent", options: FILTER_OPTIONS.region },
];

/**
 * Matching-page filter sidebar: "تصفية حسب :" header with funnel icon,
 * four labelled selects each with an enable checkbox, "مسح الفلاتر"
 * outline button, and the orange "تحتاج إلى أعضاء؟ أنشئ إعلان !" CTA below.
 *
 * Controlled component: `filters` = { gender, field, skills, region },
 * each value `""` when inactive.
 */
export default function FilterSidebar({ filters, onChange, onClear }) {
  return (
    <aside aria-label="تصفية النتائج" className="w-full space-y-5 lg:w-72">
      <div className="card p-5">
        {/* Header */}
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-primary">
          <FilterIcon className="h-5 w-5" />
          تصفية حسب :
        </h2>

        {/* Filter groups */}
        <div className="mt-5 space-y-5">
          {FILTERS.map((f) => (
            <div key={f.key}>
              <label
                htmlFor={`filter-${f.key}`}
                className={`mb-2 flex items-center gap-2 text-sm font-bold ${f.labelColor}`}
              >
                <input
                  type="checkbox"
                  checked={filters[f.key] !== ""}
                  onChange={(e) =>
                    onChange(f.key, e.target.checked ? f.options[0] : "")
                  }
                  className="h-4 w-4 rounded border-ink-faint text-primary accent-primary"
                  aria-label={`تفعيل تصفية ${f.label}`}
                />
                {f.label}
              </label>
              <select
                id={`filter-${f.key}`}
                value={filters[f.key]}
                onChange={(e) => onChange(f.key, e.target.value)}
                className="field-select"
              >
                <option value="">الكل</option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Clear */}
        <OutlineBlueButton onClick={onClear} fullWidth className="mt-6" size="sm">
          مسح الفلاتر
        </OutlineBlueButton>
      </div>

      {/* Create ad CTA */}
      <PrimaryButton href="/teams/create" fullWidth>
        تحتاج إلى أعضاء؟ أنشئ إعلان !
      </PrimaryButton>
    </aside>
  );
}