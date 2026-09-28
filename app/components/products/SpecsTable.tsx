// =============================================================================
// SpecsTable — alternating-row specs table for product detail page
// =============================================================================

import { cn } from "@/lib/utils";

interface SpecsTableProps {
  specs: Record<string, string>;
  className?: string;
}

export function SpecsTable({ specs, className }: SpecsTableProps) {
  const entries = Object.entries(specs);

  if (entries.length === 0) return null;

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="pdp-specs-table" aria-label="Product specifications">
        <tbody>
          {entries.map(([label, value], i) => (
            <tr key={label} className={i % 2 === 0 ? "pdp-specs-table__row--even" : ""}>
              <td className="pdp-specs-table__label">{label}</td>
              <td className="pdp-specs-table__value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
