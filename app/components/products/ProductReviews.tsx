"use client";

// =============================================================================
// ProductReviews — star ratings + review cards for product detail page
// =============================================================================

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductReview } from "@/types";

interface ProductReviewsProps {
  reviews: ProductReview[];
  className?: string;
}

function StarRatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="pdp-reviews__stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "fill-[var(--burgundy)] text-[var(--burgundy)]" : "fill-none text-[#e8ddd4]"
          )}
        />
      ))}
    </div>
  );
}

export function ProductReviews({ reviews, className }: ProductReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className={cn("pdp-reviews__empty", className)}>
        <p>No reviews yet. Be the first to review this product.</p>
      </div>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className={cn("pdp-reviews", className)}>
      {/* Summary */}
      <div className="pdp-reviews__summary">
        <div className="pdp-reviews__avg">
          <span className="pdp-reviews__avg-num">{avgRating.toFixed(1)}</span>
          <StarRatingDisplay rating={Math.round(avgRating)} />
          <span className="pdp-reviews__count">
            Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Review cards */}
      <div className="pdp-reviews__list">
        {reviews.map((review) => (
          <div key={review.id} className="pdp-reviews__card">
            <div className="pdp-reviews__card-header">
              <div className="pdp-reviews__avatar">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="pdp-reviews__name">{review.name}</p>
                {review.location && (
                  <p className="pdp-reviews__location">{review.location}</p>
                )}
              </div>
              <div className="pdp-reviews__card-rating">
                <StarRatingDisplay rating={review.rating} />
                <span className="pdp-reviews__date">
                  {new Date(review.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <p className="pdp-reviews__comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
