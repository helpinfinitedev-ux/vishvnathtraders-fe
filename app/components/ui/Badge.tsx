// =============================================================================
// Badge — compact label pill for grades, categories, tags
// Usage: <Badge variant="wood">BWP Grade</Badge>
// =============================================================================

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "wood" | "success" | "warning" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  default: "bg-[#f2e8dc] text-[#1c1c1c]",
  wood: "bg-[#c8956c] text-white",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  outline: "border border-[#e8ddd4] text-[#6b7280]",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full",
        BADGE_VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
