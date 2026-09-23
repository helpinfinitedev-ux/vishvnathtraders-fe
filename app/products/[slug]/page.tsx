// =============================================================================
// PRODUCT DETAIL PAGE — /products/[slug]
// =============================================================================

"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import {
  ShoppingCart,
  MessageSquare,
  Share2,
  CheckCircle2,
  Truck,
  Award,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { cn, formatPrice, getDiscount } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/siteConfig";

// ── Spec table row ──────────────────────────────────────────────────────────
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-[#f0e8de] last:border-0">
      <td className="py-3 pr-4 text-sm font-medium text-[#374151] w-48 shrink-0">{label}</td>
      <td className="py-3 text-sm text-[#6b7280]">{value}</td>
    </tr>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const [selectedThickness, setSelectedThickness] = useState(product.thickness[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [activeTab, setActiveTab] = useState<"description" | "specs">("description");

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product);
  const discount = getDiscount(product.price, product.mrp);
  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in ${product.name} (${selectedThickness}, ${selectedSize}). Please share availability and pricing.`
  );

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#f0e8de] py-4">
        <div className="container-site">
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: category?.name ?? product.category, href: `/products?category=${product.category}` },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <div className="container-site py-8 md:py-12">
        {/* ── Product Main Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-16">
          {/* Left — Image gallery */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right — Product info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="wood">{product.grade}</Badge>
              {!product.inStock && <Badge variant="warning">Out of Stock</Badge>}
              {product.inStock && <Badge variant="success" className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In Stock
              </Badge>}
              {discount > 0 && <Badge variant="outline">{discount}% OFF MRP</Badge>}
            </div>

            {/* Name */}
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Short description */}
            <p className="text-[#6b7280] leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-7">
              <span className="font-serif text-3xl font-semibold text-[#1c1c1c]">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <span className="text-[#9ca3af] line-through text-sm">{formatPrice(product.mrp)}</span>
              )}
              <span className="text-xs text-[#6b7280]">per sheet (base price)</span>
            </div>

            {/* Variant selectors */}
            <div className="space-y-5 mb-7">
              {/* Thickness */}
              <div>
                <p className="text-sm font-semibold text-[#1c1c1c] mb-2.5">
                  Thickness: <span className="text-[#c8956c]">{selectedThickness}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.thickness.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedThickness(t)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-[8px] text-sm font-medium border transition-all duration-150",
                        selectedThickness === t
                          ? "bg-[#c8956c] text-white border-[#c8956c]"
                          : "border-[#e8ddd4] text-[#374151] hover:border-[#c8956c] hover:text-[#c8956c]"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-sm font-semibold text-[#1c1c1c] mb-2.5">
                  Size: <span className="text-[#c8956c]">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-[8px] text-sm font-medium border transition-all duration-150",
                        selectedSize === s
                          ? "bg-[#c8956c] text-white border-[#c8956c]"
                          : "border-[#e8ddd4] text-[#374151] hover:border-[#c8956c] hover:text-[#c8956c]"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              <Button variant="wood" size="lg" className="flex-1 flex items-center justify-center gap-2" disabled={!product.inStock}>
                <ShoppingCart className="w-4 h-4" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 flex items-center justify-center gap-2"
                asChild
              >
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Enquire Now
                </a>
              </Button>
            </div>

            {/* Share */}
            <button className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#c8956c] transition-colors mb-7">
              <Share2 className="w-3.5 h-3.5" />
              Share this product
            </button>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#f2e8dc] rounded-[14px]">
              {[
                { icon: Award, text: "ISI Certified" },
                { icon: Truck, text: "Pan-India Delivery" },
                { icon: CheckCircle2, text: "Quality Guaranteed" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-5 h-5 text-[#c8956c]" />
                  <span className="text-[10px] font-medium text-[#7c4a2a]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description / Specs Tabs ── */}
        <div className="bg-white rounded-[20px] border border-[#f0e8de] mb-16 overflow-hidden">
          {/* Tab header */}
          <div className="flex border-b border-[#f0e8de]">
            {(["description", "specs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-4 text-sm font-medium capitalize transition-colors border-b-2",
                  activeTab === tab
                    ? "border-[#c8956c] text-[#c8956c]"
                    : "border-transparent text-[#6b7280] hover:text-[#1c1c1c]"
                )}
                aria-selected={activeTab === tab}
                role="tab"
              >
                {tab === "specs" ? "Specifications" : "Description"}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-8" role="tabpanel">
            {activeTab === "description" ? (
              <div className="max-w-2xl">
                <p className="text-[#4b5563] leading-relaxed">{product.description}</p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline">#{tag}</Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-2xl">
                <table className="w-full" aria-label="Product specifications">
                  <tbody>
                    {Object.entries(product.specifications).map(([label, value]) => (
                      <SpecRow key={label} label={label} value={value} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading">
            <SectionHeading
              id="related-heading"
              eyebrow="You May Also Like"
              title="Related Products"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
