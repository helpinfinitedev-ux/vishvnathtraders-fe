// =============================================================================
// PriceBlock — displays price, MRP, discount, and per sq ft price
// =============================================================================

import { formatPrice, getDiscount } from "@/lib/utils";

interface PriceBlockProps {
  price: number;
  mrp: number;
  pricePerSqFt?: number;
  className?: string;
}

export function PriceBlock({ price, mrp, pricePerSqFt, className }: PriceBlockProps) {
  const discount = getDiscount(price, mrp);

  return (
    <div className={className}>
      <div className="pdp-price">
        <span className="pdp-price__current">{formatPrice(price)}</span>
        {mrp > price && (
          <span className="pdp-price__mrp">{formatPrice(mrp)}</span>
        )}
        {discount > 0 && (
          <span className="pdp-price__discount">{discount}% OFF</span>
        )}
      </div>
      <div className="pdp-price__meta">
        <span>per sheet (base price)</span>
        {pricePerSqFt && (
          <>
            <span className="pdp-price__dot">•</span>
            <span>{formatPrice(pricePerSqFt)} / sq ft</span>
          </>
        )}
      </div>
    </div>
  );
}
