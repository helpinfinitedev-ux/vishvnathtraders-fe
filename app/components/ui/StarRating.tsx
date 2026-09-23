// =============================================================================
// StarRating — renders star icons for testimonials and product ratings
// Usage: <StarRating rating={4.5} />
// =============================================================================

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 1-5, supports halves
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function StarRating({ rating, max = 5, size = "sm", className }: StarRatingProps) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            starSize,
            i < rating
              ? "fill-[#c8956c] text-[#c8956c]"
              : "fill-transparent text-[#e8ddd4]"
          )}
        />
      ))}
    </div>
  );
}
