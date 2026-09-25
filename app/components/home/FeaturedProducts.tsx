// =============================================================================
// FeaturedProducts — home section showcasing hand-picked best sellers
// =============================================================================

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section
      id="featured-products"
      className="section-pad bg-[#fafaf8]"
      aria-labelledby="featured-heading"
    >
      <div className="container-site">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 md:mb-14">
          <SectionHeading
            id="featured-heading"
            eyebrow="Best Sellers"
            title="Featured Products"
            subtitle="Our most trusted products — chosen by architects, designers, and builders across India."
            className="mb-0"
          />
          <Link
            href="/products"
            className="shrink-0 inline-flex items-center justify-center rounded-full font-[family-name:var(--font-heading)] uppercase font-semibold tracking-[0.08em] transition-all duration-200 ease-out text-[0.78rem] px-[1.15rem] py-[0.45rem] bg-[#c8956c] text-white shadow-[0_4px_14px_-2px_rgba(200,149,108,0.35)] hover:bg-[#a8744e] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_-4px_rgba(200,149,108,0.45)]"
          >
            View All Products <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* Product grid — max 3 cols for spacious vertical cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
