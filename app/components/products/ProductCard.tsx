// =============================================================================
// ProductCard — vertical card
//  • Discount tag: white pill with percent icon (top-left of image)
//  • Bottom section: price row + full-width "View details" button
// No cart functionality here — Add to Cart lives on the product detail page
//
// NOTE: padding / margin are set with inline styles on purpose. On your site
// Tailwind padding & margin classes were not applying (tags had no padding,
// text touched the divider), so inline styles guarantee the spacing.
// =============================================================================

import Link from "next/link";
import { BadgePercent, Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn, formatPrice, getDiscount } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  className?: string;
}

export function ProductCard({ product, compact = false, className }: ProductCardProps) {
  const discount = getDiscount(product.price, product.mrp);

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white",
        "rounded-[22px]",
        "border border-[#efe6dc]",
        "shadow-[0_2px_16px_rgba(28,28,28,0.06)]",
        "hover:shadow-[0_14px_44px_rgba(200,149,108,0.18)]",
        "hover:-translate-y-1.5",
        "transition-all duration-300 ease-out",
        className
      )}
    >
      {/* ── IMAGE PANEL ── */}
      <div style={{ padding: "0.75rem 0.75rem 0 0.75rem" }}>
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className={cn(
            "relative shrink-0 block overflow-hidden rounded-[16px]",
            "bg-gradient-to-br from-[#f8efe6] via-[#f2e4d4] to-[#e8d5c0]",
            compact ? "h-44" : "h-52"
          )}
        >
          {/* Wood-grain lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.18]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <path
                key={i}
                d={`M0 ${i * 16} Q${50 + i * 5} ${i * 16 - 14} 100% ${i * 16}`}
                stroke="#c8956c"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
            ))}
          </svg>

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Package
              className={cn(
                "text-[#c8956c]/45 transition-transform duration-300 group-hover:scale-110",
                compact ? "w-12 h-12" : "w-14 h-14"
              )}
            />
          </div>

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Discount tag — white pill with icon (top left) */}
          {discount > 0 && product.inStock && (
            <div className="absolute z-10" style={{ top: "0.75rem", left: "0.75rem" }}>
              <span
                className="inline-flex items-center rounded-full bg-white text-[#7a4a25] font-semibold text-[13px] leading-none whitespace-nowrap shadow-[0_2px_8px_rgba(74,55,40,0.12)]"
                style={{ padding: "0.45rem 0.8rem 0.45rem 0.6rem", gap: "0.35rem" }}
              >
                <BadgePercent className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                {discount}% OFF
              </span>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute z-10" style={{ top: "0.75rem", left: "0.75rem" }}>
              <Badge variant="warning">Out of Stock</Badge>
            </div>
          )}
        </Link>
      </div>

      {/* ── CONTENT PANEL ── */}
      <div className="flex flex-col flex-1" style={{ padding: "1rem 1.25rem 1.25rem 1.25rem" }}>
        {/* Category */}
        {product.category && (
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8956c]"
            style={{ marginBottom: "0.35rem" }}
          >
            {product.category}
          </p>
        )}

        {/* Product name */}
        <Link href={`/products/${product.slug}`}>
          <h3
            className={cn(
              "font-serif font-semibold text-[#1c1c1c] leading-snug",
              "hover:text-[#c8956c] transition-colors duration-200",
              compact ? "text-sm line-clamp-1" : "text-[1.05rem] line-clamp-2"
            )}
            style={{ marginBottom: "0.5rem" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        {!compact && (
          <p
            className="text-xs md:text-sm text-[#6b7280] leading-relaxed line-clamp-2"
            style={{ marginBottom: "1.25rem" }}
          >
            {product.shortDescription}
          </p>
        )}

        {/* ── Price + full-width button ── */}
        <div
          className="mt-auto border-t border-[#f5ede4]"
          style={{ paddingTop: "1rem" }}
        >
          {/* Price row: current price, per-sheet, old price on one line */}
          <div className="flex items-baseline flex-wrap" style={{ columnGap: "0.5rem" }}>
            <p className="font-bold text-[#1c1c1c] text-xl leading-none">
              {formatPrice(product.price)}
              <span
                className="text-[11px] text-[#9ca3af] font-normal"
                style={{ marginLeft: "0.25rem" }}
              >
                /sheet
              </span>
            </p>
            {product.mrp > product.price && (
              <p className="text-sm text-[#9ca3af] line-through leading-none">
                {formatPrice(product.mrp)}
              </p>
            )}
          </div>

          {/* View button — full width */}
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              "flex w-full items-center justify-center rounded-xl",
              "text-sm font-semibold transition-colors duration-200",
              product.inStock
                ? "bg-[#c8956c] text-white hover:bg-[#b8825a]"
                : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed pointer-events-none"
            )}
            style={{ marginTop: "0.9rem", padding: "0.75rem 1rem" }}
            aria-disabled={!product.inStock}
          >
            {product.inStock ? "View details" : "Sold out"}
          </Link>
        </div>
      </div>
    </article>
  );
}