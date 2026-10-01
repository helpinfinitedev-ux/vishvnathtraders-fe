import Link from "next/link";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogueProduct } from "@/types";
import { EnquiryButton } from "./EnquiryButton";

interface CatalogueCardProps {
  product: CatalogueProduct;
  compact?: boolean;
  className?: string;
}

export function CatalogueCard({ product, compact = false, className }: CatalogueCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white",
        "rounded-[22px]",
        "border border-[var(--ivory)]",
        "shadow-[0_2px_16px_rgba(33, 26, 25,0.06)]",
        "hover:shadow-[0_14px_44px_rgba(111, 23, 38,0.18)]",
        "hover:-translate-y-1.5",
        "transition-all duration-300 ease-out",
        className
      )}
    >
      {/* ── IMAGE PANEL ── */}
      <div style={{ padding: "0.75rem 0.75rem 0 0.75rem" }}>
        <Link
          href={`/catalogue/${product.category}/${product.slug}`}
          aria-label={`View ${product.name}`}
          className={cn(
            "relative shrink-0 block overflow-hidden rounded-[16px]",
            "bg-gradient-to-br from-[var(--ivory)] via-[var(--ivory)] to-[var(--ivory)]",
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
                stroke="var(--burgundy)"
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
                "text-[var(--burgundy)]/45 transition-transform duration-300 group-hover:scale-110",
                compact ? "w-12 h-12" : "w-14 h-14"
              )}
            />
          </div>

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>

      {/* ── CONTENT PANEL ── */}
      <div className="flex flex-col flex-1" style={{ padding: "1rem 1.25rem 1.25rem 1.25rem" }}>
        {/* Subcategory / Brand */}
        {(product.subcategory || product.brand) && (
          <p
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--burgundy)]"
            style={{ marginBottom: "0.35rem" }}
          >
            {[product.brand, product.subcategory].filter(Boolean).join(" • ")}
          </p>
        )}

        {/* Product name */}
        <Link href={`/catalogue/${product.category}/${product.slug}`}>
          <h3
            className={cn(
              "font-serif font-semibold text-[var(--ink)] leading-snug",
              "hover:text-[var(--burgundy)] transition-colors duration-200",
              compact ? "text-sm line-clamp-1" : "text-[1.05rem] line-clamp-2"
            )}
            style={{ marginBottom: "0.5rem" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Short description */}
        {!compact && product.description && (
          <p
            className="text-xs md:text-sm text-[var(--ink-soft)] leading-relaxed line-clamp-2"
            style={{ marginBottom: "1.25rem" }}
          >
            {product.description}
          </p>
        )}

        {/* ── Action: Full width Enquiry button ── */}
        <div
          className="mt-auto border-t border-[var(--ivory)]"
          style={{ paddingTop: "1rem" }}
        >
          <EnquiryButton product={product} variant="full" />
        </div>
      </div>
    </article>
  );
}
