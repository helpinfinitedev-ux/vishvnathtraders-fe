// =============================================================================
// ProductCard — vertical card with proper padding and contained layout
// =============================================================================

import Link from "next/link";
import { Package, ExternalLink } from "lucide-react";
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
  // const gradeVariant = product.grade.toLowerCase().includes("bwp")
  //   ? "wood"
  //   : product.grade.toLowerCase().includes("fr")
  //     ? "warning"
  //     : "default";

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
      {/* ── IMAGE PANEL (Contained with inner margin/rounding) ── */}
      <div className="p-3 pb-0">
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

          {/* Discount badge — top left */}
          {discount > 0 && product.inStock && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="wood">{discount}% OFF</Badge>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="warning">Out of Stock</Badge>
            </div>
          )}

          {/* Grade badge — top right */}
          {/* <div className="absolute top-3 right-3 z-10">
            <Badge
              variant={gradeVariant as "wood" | "warning" | "default"}
              className="capitalize text-[10px] tracking-wide shadow-sm"
            >
              {product.grade}
            </Badge>
          </div> */}
        </Link>
      </div>

      {/* ── CONTENT PANEL ── */}
      <div className="flex flex-col flex-1" style={{ padding: "1rem 1.25rem 1.25rem 1.25rem" }}>
        {/* Category */}
        {product.category && (
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#c8956c] mb-1.5">
            {product.category}
          </p>
        )}

        {/* Product name */}
        <Link href={`/products/${product.slug}`}>
          <h3
            className={cn(
              "font-serif font-semibold text-[#1c1c1c] leading-snug mb-2",
              "hover:text-[#c8956c] transition-colors duration-200",
              compact ? "text-sm line-clamp-1" : "text-[1.05rem] line-clamp-2"
            )}
          >
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        {!compact && (
          <p className="text-xs md:text-sm text-[#6b7280] leading-relaxed line-clamp-2 mb-4">
            {product.shortDescription}
          </p>
        )}

        {/* ── Price + CTA Container ── */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3.5 border-t border-[#f5ede4]">
          {/* Price block */}
          <div className="min-w-0">
            <p className="font-bold text-[#1c1c1c] text-lg leading-none">
              {formatPrice(product.price)}
              <span className="text-[10px] text-[#9ca3af] font-normal ml-1">/sheet</span>
            </p>
            {product.mrp > product.price && (
              <p className="text-xs text-[#9ca3af] line-through mt-1">
                {formatPrice(product.mrp)}
              </p>
            )}
          </div>

          {/* View button */}
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              "shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full",
              "font-[family-name:var(--font-heading)] uppercase font-bold",
              "tracking-[0.09em] transition-all duration-200 ease-out",
              "text-[0.85rem]",
              product.inStock
                ? "bg-[#c8956c] text-white shadow-[0_4px_14px_-2px_rgba(200,149,108,0.35)] hover:bg-[#a8744e] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-4px_rgba(200,149,108,0.45)]"
                : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed pointer-events-none"
            )}
            style={{ padding: "0.55rem 1.4rem" }}
            aria-disabled={!product.inStock}
          >
            {product.inStock ? (
              <>
                VIEW <ExternalLink size={14} strokeWidth={2.5} />
              </>
            ) : (
              "Sold Out"
            )}
          </Link>
        </div>
      </div>
    </article>
  );
}