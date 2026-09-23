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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <SectionHeading
            id="featured-heading"
            eyebrow="Best Sellers"
            title="Featured Products"
            subtitle="Our most trusted products — chosen by architects, designers, and builders across India."
            className="mb-0"
          />
          <Button variant="outline" size="md" asChild className="shrink-0">
            <Link href="/products" className="flex items-center gap-2">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
