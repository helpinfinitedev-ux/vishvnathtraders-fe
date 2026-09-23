// =============================================================================
// ProductCard — reusable card used in shop grid, featured products, related
// Shared single source — no duplication across pages
// =============================================================================

import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, formatPrice, getDiscount } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  compact?: boolean; // smaller variant for related products strip
  className?: string;
}

export function ProductCard({ product, compact = false, className }: ProductCardProps) {
  const discount = getDiscount(product.price, product.mrp);
  const gradeVariant = product.grade.toLowerCase().includes("bwp")
    ? "wood"
    : product.grade.toLowerCase().includes("fr")
    ? "warning"
    : "default";

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white rounded-[16px] overflow-hidden",
        "border border-[#f0e8de]",
        "shadow-[0_2px_12px_rgba(28,28,28,0.06)]",
        "hover:shadow-[0_8px_32px_rgba(200,149,108,0.18)]",
        "hover:-translate-y-1",
        "transition-all duration-300 ease-out",
        className
      )}
    >
      {/* ── Image Placeholder ── */}
      <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <div
          className={cn(
            "relative overflow-hidden bg-gradient-to-br from-[#f5ede4] to-[#e8ddd4]",
            compact ? "h-40" : "h-52 md:h-60"
          )}
        >
          {/* Wood-grain placeholder pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <path
                key={i}
                d={`M0 ${i * 12} Q${50 + i * 5} ${i * 12 - 8} 100% ${i * 12}`}
                stroke="#c8956c"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              />
            ))}
          </svg>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-16 h-16 text-[#c8956c]/40" />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#1c1c1c]/0 group-hover:bg-[#1c1c1c]/10 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Discount Badge (Left) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {!product.inStock && (
              <Badge variant="warning">Out of Stock</Badge>
            )}
            {discount > 0 && product.inStock && (
              <Badge variant="wood">{discount}% OFF</Badge>
            )}
          </div>

          {/* Grade Badge (Right) */}
          <div className="absolute top-3 right-3 z-10">
            <Badge variant={gradeVariant as "wood" | "warning" | "default"} className="capitalize shadow-sm">
              {product.grade}
            </Badge>
          </div>
        </div>
      </Link>

      {/* ── Content ── */}
      <div className={cn("flex flex-col flex-1 p-4", compact ? "p-3.5" : "p-5")}>
        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3
            className={cn(
              "font-serif font-semibold text-[#1c1c1c] leading-snug mb-1.5",
              "hover:text-[#c8956c] transition-colors duration-200",
              compact ? "text-sm" : "text-base md:text-lg"
            )}
          >
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        {!compact && (
          <p className="text-sm text-[#6b7280] leading-relaxed mb-4 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Thickness chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.thickness.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium px-2.5 py-1 rounded-[6px] bg-white border border-[#e8ddd4] text-[#6b7280] shadow-sm"
            >
              {t}
            </span>
          ))}
          {product.thickness.length > 4 && (
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-[6px] bg-[#f5ede4] text-[#6b7280]">
              +{product.thickness.length - 4}
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2 border-t border-[#f0e8de]/50">
          <div className="flex-1 min-w-[120px]">
            <p className="font-semibold text-[#1c1c1c] text-[1.05rem] leading-none mb-1">
              {formatPrice(product.price)}
              <span className="text-xs text-[#9ca3af] font-normal"> /sheet</span>
            </p>
            {product.mrp > product.price && (
              <p className="text-xs text-[#9ca3af] line-through">{formatPrice(product.mrp)}</p>
            )}
          </div>

          <Button
            variant="wood"
            size="sm"
            className="shrink-0"
            asChild
          >
            <Link href={`/products/${product.slug}`}>View</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
