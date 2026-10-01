"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CatalogueFiltersState {
  brands: string[];
  subcategories: string[];
  types: string[];
  sizes: string[];
  thicknesses: string[];
}

export const DEFAULT_CATALOGUE_FILTERS: CatalogueFiltersState = {
  brands: [],
  subcategories: [],
  types: [],
  sizes: [],
  thicknesses: [],
};

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function FilterSection({ title, options, selected, onChange }: FilterSectionProps) {
  const [open, setOpen] = useState(true);

  if (options.length === 0) return null;

  return (
    <div className="py-5 border-b border-[var(--color-border)] last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between font-serif text-lg font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        {open ? <ChevronUp className="w-5 h-5 text-[var(--color-muted)]" /> : <ChevronDown className="w-5 h-5 text-[var(--color-muted)]" />}
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <label key={option} className="flex items-start cursor-pointer group">
                <div className="relative flex items-center justify-center mt-[2px]">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange([...selected, option]);
                      } else {
                        onChange(selected.filter((v) => v !== option));
                      }
                    }}
                  />
                  <div
                    className={cn(
                      "w-[18px] h-[18px] rounded border transition-colors",
                      isSelected
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                        : "bg-white border-[var(--color-muted)] group-hover:border-[var(--color-accent)]"
                    )}
                  >
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 text-white mx-auto mt-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className={cn(
                    "ml-3 text-sm font-body transition-colors",
                    isSelected ? "text-[var(--color-primary)] font-medium" : "text-[var(--color-muted)] group-hover:text-[var(--color-primary)]"
                  )}
                >
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface CatalogueFiltersProps {
  filters: CatalogueFiltersState;
  onChange: (filters: CatalogueFiltersState) => void;
  onClear: () => void;
  // Available options
  availableBrands: string[];
  availableSubcategories: string[];
  availableTypes: string[];
  availableSizes: string[];
  availableThicknesses: string[];
}

export function CatalogueFilters({
  filters,
  onChange,
  onClear,
  availableBrands,
  availableSubcategories,
  availableTypes,
  availableSizes,
  availableThicknesses,
}: CatalogueFiltersProps) {
  const handleSectionChange = (key: keyof CatalogueFiltersState) => (selected: string[]) => {
    onChange({ ...filters, [key]: selected });
  };

  return (
    <div className="bg-white rounded-[20px] p-6 border border-[var(--color-border)] shadow-[0_2px_24px_rgba(33,26,25,0.04)]">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
        <h2 className="font-serif text-xl font-bold text-[var(--color-primary)]">Filters</h2>
        <button
          onClick={onClear}
          className="text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] underline underline-offset-2"
        >
          Clear all
        </button>
      </div>

      <div className="mt-2">
        <FilterSection
          title="Brands"
          options={availableBrands}
          selected={filters.brands}
          onChange={handleSectionChange("brands")}
        />
        <FilterSection
          title="Subcategories"
          options={availableSubcategories}
          selected={filters.subcategories}
          onChange={handleSectionChange("subcategories")}
        />
        <FilterSection
          title="Types"
          options={availableTypes}
          selected={filters.types}
          onChange={handleSectionChange("types")}
        />
        <FilterSection
          title="Sizes"
          options={availableSizes}
          selected={filters.sizes}
          onChange={handleSectionChange("sizes")}
        />
        <FilterSection
          title="Thickness"
          options={availableThicknesses}
          selected={filters.thicknesses}
          onChange={handleSectionChange("thicknesses")}
        />
      </div>
    </div>
  );
}
