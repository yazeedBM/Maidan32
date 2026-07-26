"use client";

import { FilterIcon } from "./Icons";
import { OutlineBlueButton, PrimaryButton } from "./Buttons";
import { FILTER_OPTIONS } from "@/lib/sampleData";

const FILTERS = [
  { key: "gender", label: "الجنس", options: FILTER_OPTIONS.gender },
  { key: "field", label: "مجال الهاكاثون", options: FILTER_OPTIONS.field },
  { key: "skills", label: "المهارات المطلوبة", options: FILTER_OPTIONS.skills },
  { key: "region", label: "المنطقة", options: FILTER_OPTIONS.region },
];

/**
 * Matching-page filter rail: "تصفية حسب :" header with a funnel glyph, four
 * orange-labelled groups each pairing an enable checkbox with a select, a
 * "مسح الفلاتر" outline button, then the orange create-ad CTA below the card.
 *
 * Controlled: `filters` is { gender, field, skills, region }, each "" when off.
 */
export default function FilterSidebar({ filters, onChange, onClear }) {
  return (
    <aside aria-label="تصفية النتائج" className="w-full space-y-5 lg:w-[300px] lg:shrink-0">
      <div className="card p-5">
        <h2 className="flex items-center gap-2 text-[17px] font-extrabold text-primary">
          <FilterIcon className="h-[18px] w-[18px] text-accent" />
          تصفية حسب :
        </h2>

        <div className="mt-5 space-y-4">
          {FILTERS.map((f) => (
            <div key={f.key}>
              {/* Checkbox first → RTL puts it at the rail's right edge */}
              <label
                htmlFor={`filter-${f.key}`}
                className="mb-2 flex flex-row-reverse items-center justify-end gap-2 text-[14px] font-bold text-accent"
              >
                <input
                  type="checkbox"
                  checked={filters[f.key] !== ""}
                  onChange={(e) =>
                    onChange(f.key, e.target.checked ? f.options[0] : "")
                  }
                  className="h-[15px] w-[15px] rounded border-ink-faint accent-primary"
                  aria-label={`تفعيل تصفية ${f.label}`}
                />
                {f.label}
              </label>
              <select
                id={`filter-${f.key}`}
                value={filters[f.key]}
                onChange={(e) => onChange(f.key, e.target.value)}
                className="field-select bg-white ring-1 ring-inset ring-black/[0.06]"
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

        <OutlineBlueButton onClick={onClear} fullWidth className="mt-6" size="sm">
          مسح الفلاتر
        </OutlineBlueButton>
      </div>

      <PrimaryButton href="/teams/create" fullWidth size="md">
        تحتاج إلى أعضاء؟ أنشئ إعلان !
      </PrimaryButton>
    </aside>
  );
}
