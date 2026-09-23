"use client";

// =============================================================================
// FilterSidebar — collapsible filter panel for the products page
// Controlled component — passes filters up to parent
// =============================================================================

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { getAllGrades, getAllThicknesses, PRICE_RANGE } from "@/data/products";
import { cn } from "@/lib/utils";
import type { ProductFilters } from "@/types";

interface FilterSidebarProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onClear: () => void;
}

// ── Collapsible filter group ──────────────────────────────────────────────────
function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#f0e8de] py-5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left outline-none group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[#1c1c1c] group-hover:text-[#c8956c] transition-colors">{title}</span>
        <ChevronDown
          className={cn("w-4 h-4 text-[#6b7280] transition-transform duration-300", open && "rotate-180")}
        />
      </button>
      {open && <div className="mt-4 animate-fade-up" style={{ animationDuration: '0.2s' }}>{children}</div>}
    </div>
  );
}

// ── Checkbox item ─────────────────────────────────────────────────────────────
function CheckItem({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 py-2 cursor-pointer group"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-[#e8ddd4] accent-[#c8956c] cursor-pointer"
      />
      <span className="text-sm text-[#374151] group-hover:text-[#1c1c1c] transition-colors capitalize">
        {label}
      </span>
    </label>
  );
}

export function FilterSidebar({ filters, onChange, onClear }: FilterSidebarProps) {
  const grades = getAllGrades();
  const thicknesses = getAllThicknesses();

  const toggleArray = (arr: string[], value: string): string[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const activeCount =
    filters.categories.length +
    filters.grades.length +
    filters.thicknesses.length +
    (filters.priceRange[0] > PRICE_RANGE[0] || filters.priceRange[1] < PRICE_RANGE[1] ? 1 : 0);

  return (
    <aside
      className="bg-white rounded-[18px] border border-[#f0e8de] p-5 sticky top-24 shadow-[0_2px_12px_rgba(28,28,28,0.05)]"
      aria-label="Product filters"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-serif text-base font-semibold text-[#1c1c1c]">Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-[#c8956c] hover:text-[#a8744e] font-medium transition-colors"
          >
            <X className="w-3 h-3" />
            Clear ({activeCount})
          </button>
        )}
      </div>

      {/* Category */}
      <FilterGroup title="Category">
        {categories.map((cat) => (
          <CheckItem
            key={cat.slug}
            id={`cat-${cat.slug}`}
            label={`${cat.name} (${cat.productCount})`}
            checked={filters.categories.includes(cat.slug)}
            onChange={() =>
              onChange({ ...filters, categories: toggleArray(filters.categories, cat.slug) })
            }
          />
        ))}
      </FilterGroup>

      {/* Grade */}
      <FilterGroup title="Grade">
        {grades.map((grade) => (
          <CheckItem
            key={grade}
            id={`grade-${grade}`}
            label={grade}
            checked={filters.grades.includes(grade)}
            onChange={() =>
              onChange({ ...filters, grades: toggleArray(filters.grades, grade) })
            }
          />
        ))}
      </FilterGroup>

      {/* Thickness */}
      <FilterGroup title="Thickness">
        <div className="flex flex-wrap gap-2.5 mt-2">
          {thicknesses.map((t) => (
            <button
              key={t}
              onClick={() =>
                onChange({ ...filters, thicknesses: toggleArray(filters.thicknesses, t) })
              }
              className={cn(
                "text-[13px] px-3.5 py-1.5 rounded-[8px] border font-medium transition-all duration-200",
                filters.thicknesses.includes(t)
                  ? "bg-[#c8956c] text-white border-[#c8956c] shadow-[0_2px_8px_rgba(200,149,108,0.25)]"
                  : "bg-white border-[#e8ddd4] text-[#6b7280] hover:border-[#c8956c] hover:text-[#c8956c] hover:shadow-sm"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Price Range */}
      <FilterGroup title="Price Range (₹/sheet)">
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center justify-between text-xs font-medium text-[#6b7280]">
            <span>₹{PRICE_RANGE[0].toLocaleString("en-IN")}</span>
            <span className="text-[#1c1c1c] bg-[#f5ede4] px-2.5 py-1 rounded-[6px]">
              Up to ₹{filters.priceRange[1].toLocaleString("en-IN")}
            </span>
          </div>
          <input
            type="range"
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={200}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onChange({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
            className="w-full accent-[#c8956c] cursor-pointer"
            aria-label={`Maximum price: ₹${filters.priceRange[1]}`}
          />
        </div>
      </FilterGroup>

      {/* Apply button (mobile) */}
      <Button variant="wood" size="md" className="w-full mt-4">
        Apply Filters
      </Button>
    </aside>
  );
}
