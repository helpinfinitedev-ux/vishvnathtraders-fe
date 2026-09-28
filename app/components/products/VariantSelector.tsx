"use client";

// =============================================================================
// VariantSelector — pill/chip selector for thickness, size, etc.
// =============================================================================

import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

export function VariantSelector({
  label,
  options,
  selected,
  onSelect,
  className,
}: VariantSelectorProps) {
  return (
    <div className={className}>
      <p className="pdp-variant__label">
        {label}: <span className="pdp-variant__selected">{selected}</span>
      </p>
      <div className="pdp-variant__options">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={cn(
              "pdp-variant__chip",
              selected === opt && "pdp-variant__chip--active"
            )}
            aria-pressed={selected === opt}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
