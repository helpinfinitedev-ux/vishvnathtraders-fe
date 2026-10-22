// =============================================================================
// CategoryHighlights — simple icon tiles (active / hovered tile fills with tan)
// Connected to backend categoryService
// =============================================================================

import Link from "next/link";
import {
  DoorClosed,
  Layers,
  LayoutGrid,
  Leaf,
  Package,
  Palette,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import { categories as fallbackCategories } from "@/data/categories";
import { categoryService } from "@/services/categoryService";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

// One lucide icon per category slug
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  doors: DoorClosed,
  louvers: LayoutGrid,
  "charcoal-sheets": Leaf,
  "uv-sheets": Palette,
  plywood: Layers,
  laminates: Ruler,
};

type CategoryHighlightsProps = {
  /**
   * Slug of the currently selected category (e.g. "plywood").
   * On /products you can pass searchParams.category here.
   * Leave undefined on the home page: all tiles stay tan, and turn white on hover.
   */
  activeSlug?: string;
};

export async function CategoryHighlights({ activeSlug }: CategoryHighlightsProps) {
  let categories: Category[] = fallbackCategories;

  try {
    const liveCategories = await categoryService.getCategories();
    if (liveCategories && liveCategories.length > 0) {
      categories = liveCategories;
    }
  } catch (err) {
    console.warn("Failed to load live categories in CategoryHighlights, using fallback:", err);
  }

  return (
    <section
      className="bg-white"
      style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}
      aria-label="Product categories"
    >
      <div className="container-site">
        <div className="rounded-[28px] border border-[var(--ivory)] bg-[#faf5ef] p-4 md:p-5 shadow-[0_8px_30px_rgba(74,55,40,0.08)]">
          <div
            className={cn(
              "grid grid-cols-2 gap-4 md:gap-5",
              "md:grid-flow-col md:auto-cols-fr",
              "max-md:[&>*:last-child:nth-child(odd)]:col-span-2"
            )}
          >
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] ?? Package;
              const isActive = cat.slug === activeSlug;

              return (
                <Link
                  key={cat.id}
                  href={`/catalogue/${cat.slug}`}
                  aria-label={`Browse ${cat.name} — ${cat.productCount} products`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex flex-col items-center justify-center gap-3 md:gap-4",
                    "rounded-3xl border-2 px-3 py-8 md:py-12 min-h-[130px] md:min-h-[190px] text-center",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--burgundy)] focus-visible:ring-offset-2",
                    isActive
                      ? "bg-[var(--maroon)] border-[var(--maroon)] text-white"
                      : "bg-[var(--burgundy)] border-[var(--burgundy)] text-white hover:bg-white hover:text-[var(--burgundy)]"
                  )}
                >
                  <Icon className="w-9 h-9 md:w-12 md:h-12" strokeWidth={1.6} aria-hidden="true" />
                  <span className="text-sm md:text-lg font-medium leading-tight">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}