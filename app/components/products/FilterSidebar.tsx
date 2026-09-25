"use client";

// =============================================================================
// FilterSidebar — collapsible filter panel for the products page
// Controlled component — passes filters up to parent
// =============================================================================

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { categories } from "@/data/categories";
import { getAllThicknesses, PRICE_RANGE } from "@/data/products";
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
  defaultOpen = false,
  selectedValue = "",
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  selectedValue?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="bg-white"
      style={{
        padding: "1rem",
        marginBottom: "0.75rem",
        borderRadius: "0.75rem",
        border: "1px solid #f3f4f6",
        boxShadow: "0 1px 4px rgba(0,0,0,0.02)"
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left outline-none group"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#1c1c1c]" style={{ fontSize: "0.95rem" }}>{title}</span>
        <div className="flex items-center gap-2">
          {selectedValue && !open && (
            <span className="text-gray-400 font-medium" style={{ fontSize: "0.8rem" }}>{selectedValue}</span>
          )}
          <ChevronDown
            className={cn("w-4 h-4 text-[#9ca3af] transition-transform duration-300", open && "rotate-180")}
          />
        </div>
      </button>
      {open && <div className="animate-fade-down" style={{ marginTop: "1rem", animationDuration: '0.2s' }}>{children}</div>}
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
      className="flex items-center justify-between cursor-pointer group"
      style={{ padding: "0.4rem 0" }}
    >
      <span className="text-[#4b5563] group-hover:text-[#1c1c1c] transition-colors capitalize font-medium" style={{ fontSize: "0.85rem" }}>
        {label}
      </span>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="text-black focus:ring-black accent-black cursor-pointer"
        style={{ width: "1rem", height: "1rem", borderRadius: "3px", border: "1px solid #d1d5db" }}
      />
    </label>
  );
}

export function FilterSidebar({ filters, onChange, onClear }: FilterSidebarProps) {
  const thicknesses = getAllThicknesses();

  const toggleArray = (arr: string[], value: string): string[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const activeCount =
    filters.categories.length +
    filters.thicknesses.length +
    (filters.priceRange[0] > PRICE_RANGE[0] || filters.priceRange[1] < PRICE_RANGE[1] ? 1 : 0);

  const categorySelectedValue = filters.categories.length === 1
    ? categories.find(c => c.slug === filters.categories[0])?.name
    : filters.categories.length > 1 ? `${filters.categories.length} selected` : "";

  const activeTags = [
    ...filters.categories.map((c) => ({
      label: categories.find((cat) => cat.slug === c)?.name ?? c,
      key: `cat:${c}`,
      clear: () => onChange({ ...filters, categories: filters.categories.filter((v) => v !== c) }),
    })),
    ...filters.thicknesses.map((t) => ({
      label: t,
      key: `thickness:${t}`,
      clear: () => onChange({ ...filters, thicknesses: filters.thicknesses.filter((v) => v !== t) }),
    })),
  ];

  return (
    <aside
      className="bg-[#f8f9fa] sticky top-24"
      aria-label="Product filters"
      style={{
        padding: "1rem",
        borderRadius: "1rem",
        border: "1px solid #f0e8de",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        width: "100%"
      }}
    >
      {/* Header */}
      <div className="flex flex-col relative" style={{ marginBottom: "1rem" }}>
        {/* Decorative Drag Handle */}
        <div style={{ width: "2rem", height: "0.25rem", backgroundColor: "#e5e7eb", borderRadius: "9999px", margin: "0 auto 0.75rem auto" }} />

        <div className="flex items-center justify-center relative">
          <h2 className="font-sans font-bold text-[#1c1c1c]" style={{ fontSize: "1.05rem" }}>Filter</h2>
          <button className="absolute right-0 text-gray-400 hover:text-black transition-colors" onClick={onClear}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Tags */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: "1rem" }}>
          {activeTags.map((tag) => (
            <button
              key={tag.key}
              onClick={tag.clear}
              className="flex items-center gap-1 text-[#4b5563] bg-white transition-colors hover:bg-gray-100"
              style={{ padding: "0.3rem 0.6rem", borderRadius: "0.5rem", fontSize: "0.8rem", border: "1px solid #e5e7eb" }}
            >
              {tag.label}
              <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}

      {/* Category */}
      <FilterGroup
        title="Category"
        defaultOpen={true}
        selectedValue={categorySelectedValue}
      >
        <div className="flex flex-col">
          {categories.map((cat) => (
            <CheckItem
              key={cat.slug}
              id={`cat-${cat.slug}`}
              label={cat.name}
              checked={filters.categories.includes(cat.slug)}
              onChange={() =>
                onChange({ ...filters, categories: toggleArray(filters.categories, cat.slug) })
              }
            />
          ))}
        </div>
      </FilterGroup>

      {/* Thickness */}
      <FilterGroup
        title="Thickness"
        selectedValue={filters.thicknesses.length > 0 ? `${filters.thicknesses.length} selected` : ""}
      >
        <div className="flex flex-wrap gap-2">
          {thicknesses.map((t) => (
            <button
              key={t}
              onClick={() =>
                onChange({ ...filters, thicknesses: toggleArray(filters.thicknesses, t) })
              }
              className="font-medium transition-all duration-200"
              style={{
                fontSize: "0.8rem",
                padding: "0.3rem 0.6rem",
                borderRadius: "0.5rem",
                border: filters.thicknesses.includes(t) ? "1px solid #111" : "1px solid #e5e7eb",
                backgroundColor: filters.thicknesses.includes(t) ? "#111" : "#ffffff",
                color: filters.thicknesses.includes(t) ? "#ffffff" : "#4b5563"
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Price Range */}
      <FilterGroup title="Price" defaultOpen={true}>
        <div className="flex flex-col gap-4 pt-1">
          {/* Slider */}
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
            className="w-full appearance-none cursor-pointer accent-black"
            style={{ height: "0.25rem", backgroundColor: "#e5e7eb", borderRadius: "0.5rem" }}
            aria-label={`Maximum price: ₹${filters.priceRange[1]}`}
          />

          {/* Inputs */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-white" style={{ border: "1px solid #e5e7eb", borderRadius: "0.5rem", padding: "0.4rem 0.6rem" }}>
              <span className="text-gray-500 font-medium mr-1" style={{ fontSize: "0.8rem" }}>₹</span>
              <input
                type="number"
                readOnly
                value={filters.priceRange[0]}
                className="w-full bg-transparent font-semibold outline-none text-[#1c1c1c]"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <span className="text-gray-400 font-bold" style={{ fontSize: "0.8rem" }}>-</span>
            <div className="flex-1 flex items-center bg-white" style={{ border: "1px solid #e5e7eb", borderRadius: "0.5rem", padding: "0.4rem 0.6rem" }}>
              <span className="text-gray-500 font-medium mr-1" style={{ fontSize: "0.8rem" }}>₹</span>
              <input
                type="number"
                readOnly
                value={filters.priceRange[1]}
                className="w-full bg-transparent font-semibold outline-none text-[#1c1c1c]"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
          </div>
        </div>
      </FilterGroup>

      {/* Bottom Sticky Action Bar */}
      <div className="flex items-center gap-2" style={{ marginTop: "1rem" }}>
        <button
          onClick={onClear}
          className="flex-1 bg-[#111] text-white font-semibold transition-colors  hover:bg-black flex items-center justify-center whitespace-nowrap"
          style={{ border: "1px solid #e5e7eb", padding: "0.4rem", borderRadius: "0.5rem", fontSize: "0.95rem" }}
        >
          Clear all {activeCount > 0 ? `(${activeCount})` : ""}
        </button>
      </div>
    </aside>
  );
}
