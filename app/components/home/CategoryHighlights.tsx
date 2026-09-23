// =============================================================================
// CategoryHighlights — 6-up category card grid on the home page
// =============================================================================

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

// Each category gets a unique gradient & accent for visual variety
const CATEGORY_STYLES: Record<string, { gradient: string; icon: string }> = {
  plywood:       { gradient: "from-[#4a3728] to-[#7c5b43]", icon: "🪵" },
  blockboard:    { gradient: "from-[#6b4c3a] to-[#9c7556]", icon: "🟩" },
  veneer:        { gradient: "from-[#5e402e] to-[#8f6246]", icon: "🌿" },
  laminates:     { gradient: "from-[#3d2a1c] to-[#664630]", icon: "🎨" },
  "flush-doors": { gradient: "from-[#705039] to-[#a3795a]", icon: "🚪" },
  mdf:           { gradient: "from-[#523827] to-[#80583d]", icon: "📐" },
};

export function CategoryHighlights() {
  return (
    <section
      className="section-pad bg-white"
      aria-labelledby="categories-heading"
    >
      <div className="container-site">
        <SectionHeading
          id="categories-heading"
          eyebrow="Product Range"
          title="Our Categories"
          subtitle="From structural plywood to decorative laminates — everything you need for world-class interiors."
          centered
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, index) => {
            const style = CATEGORY_STYLES[cat.slug] ?? {
              gradient: "from-[#2d2520] to-[#4a3728]",
              icon: "📦",
            };

            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={cn(
                  "group relative overflow-hidden rounded-[20px]",
                  "flex flex-col justify-end",
                  "min-h-[200px] md:min-h-[240px]",
                  // First card spans 2 columns on desktop
                  index === 0 && "md:col-span-2 md:row-span-1",
                  "transition-transform duration-300 hover:-translate-y-1",
                  "shadow-[0_4px_20px_rgba(28,28,28,0.12)]",
                  "hover:shadow-[0_12px_36px_rgba(28,28,28,0.18)]"
                )}
                aria-label={`Browse ${cat.name} — ${cat.productCount} products`}
              >
                {/* Background gradient */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-90",
                    style.gradient
                  )}
                />

                {/* Wood grain overlay */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-[0.08]"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <path
                      key={i}
                      d={`M0 ${i * 18} Q50 ${i * 18 - 6} 100% ${i * 18}`}
                      stroke="#c8956c"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  ))}
                </svg>

                {/* Top-right product count badge */}
                <div className="absolute top-4 right-4 text-xs font-medium text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                  {cat.productCount} Products
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 md:p-6">
                  {/* Icon */}
                  <span className="text-3xl mb-3 block" aria-hidden="true">{style.icon}</span>

                  {/* Name */}
                  <h3 className="font-serif text-xl font-semibold text-white mb-1">{cat.name}</h3>

                  {/* Description */}
                  <p className="text-sm text-white/60 leading-relaxed mb-4 hidden md:block line-clamp-2">
                    {cat.description}
                  </p>

                  {/* Link arrow */}
                  <div className="flex items-center gap-1.5 text-[#c8956c] text-sm font-medium group-hover:gap-3 transition-all duration-200">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
