// =============================================================================
// PRODUCT DETAIL PAGE — /products/[slug]
// Dynamic template — renders any product from data by slug
// =============================================================================

"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import {
  ShoppingCart,
  MessageSquare,
  Share2,
  Droplets,
  Shield,
  Award,
  Timer,
  Truck,
  AlertTriangle,
} from "lucide-react";
import { PageBanner } from "@/components/ui/PageBanner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { VariantSelector } from "@/components/products/VariantSelector";
import { PriceBlock } from "@/components/products/PriceBlock";
import { SpecsTable } from "@/components/products/SpecsTable";
import { TrustBadges } from "@/components/products/TrustBadges";
import { FAQAccordion } from "@/components/products/FAQAccordion";
import { ProductReviews } from "@/components/products/ProductReviews";
import { EnquiryBox } from "@/components/products/EnquiryBox";
import { StickyActionBar } from "@/components/products/StickyActionBar";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";
import { SITE_CONFIG } from "@/data/siteConfig";
import { useCart } from "@/context/CartContext";

// ── Icon map for benefits ─────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Shield,
  Award,
  Timer,
  Truck,
  AlertTriangle,
};

// ── Default fallback data for products missing extended fields ─────────────────
const DEFAULT_FAQS = [
  { question: "What grade is this product?", answer: "Please refer to the Specifications tab for detailed grade and standard information." },
  { question: "Is pan-India delivery available?", answer: "Yes, we deliver across all 28 states in India through our dedicated logistics network." },
  { question: "Can I get a custom size?", answer: "Custom sizes are available on bulk orders with minimum MOQ. Contact us for details." },
  { question: "Is cutting and return possible?", answer: "Due to the custom nature of wood products, cut-to-size sheets cannot be returned or exchanged. Please verify measurements before ordering." },
];

const DEFAULT_BENEFITS = [
  { icon: "Award", title: "ISI Certified", description: "Manufactured under strict BIS standards with batch-level quality testing." },
  { icon: "Shield", title: "Quality Guaranteed", description: "Zero-defect production philosophy with in-house quality lab." },
  { icon: "Truck", title: "Pan-India Delivery", description: "Timely delivery to your site across all 28 states." },
  { icon: "Timer", title: "Warranty Covered", description: "Comprehensive warranty against manufacturing defects." },
];

// =============================================================================
export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const [selectedThickness, setSelectedThickness] = useState(product.thickness[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product);
  const brand = product.brand ?? "WoodCraft Premium";
  const faqs = product.faqs?.length ? product.faqs : DEFAULT_FAQS;
  const benefits = product.benefits?.length ? product.benefits : DEFAULT_BENEFITS;
  const reviews = product.reviews ?? [];
  const useCases = product.useCases ?? [];

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (${selectedThickness}, ${selectedSize}, Qty: ${quantity}). Please share availability and pricing.`
  );

  // ── JSON-LD Product Schema ────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: brand },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    ...(reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
        reviewCount: reviews.length,
      },
    }),
  };

  return (
    <div className="pdp-page bg-[#fafaf8] min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. Page Banner ── */}
      <PageBanner
        title={product.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: category?.name ?? product.category, href: `/products?category=${product.category}` },
          { label: product.name },
        ]}
      />

      {/* ── 2. Main Product Section (Gallery + Info) ── */}
      <section className="pdp-section">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "var(--space-7)" }}>
            {/* Left — Image Gallery */}
            <div>
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Right — Product Info */}
            <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
              {/* Brand + Badges */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--burgundy)] mb-2">
                  {brand}
                </p>
                <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--ink)] leading-tight mb-3">
                  {product.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-1">
                  {product.inStock ? (
                    <Badge variant="success" className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="warning">Out of Stock</Badge>
                  )}
                  {product.warranty && <Badge variant="outline">{product.warranty} Warranty</Badge>}
                </div>
              </div>

              {/* Short description */}
              <p className="text-[var(--ink-soft)] leading-relaxed text-[0.95rem]">
                {product.shortDescription}
              </p>

              {/* Price */}
              <PriceBlock
                price={product.price}
                mrp={product.mrp}
                pricePerSqFt={product.pricePerSqFt}
              />

              {/* Variant Selectors */}
              <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
                <VariantSelector
                  label="Thickness"
                  options={product.thickness}
                  selected={selectedThickness}
                  onSelect={setSelectedThickness}
                />
                <VariantSelector
                  label="Size"
                  options={product.sizes}
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                />
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-[var(--ink)] mb-3">Quantity</p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-l-[8px] border border-[#e8ddd4] bg-white text-[var(--ink)] font-semibold text-lg hover:bg-[#f2e8dc] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-14 h-10 text-center border-y border-[#e8ddd4] bg-white text-[var(--ink)] font-semibold text-sm outline-none"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-r-[8px] border border-[#e8ddd4] bg-white text-[var(--ink)] font-semibold text-lg hover:bg-[#f2e8dc] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row" style={{ gap: "var(--space-3)" }}>
                <Button
                  variant="wood"
                  size="lg"
                  className="flex-1 flex items-center justify-center gap-2"
                  disabled={!product.inStock}
                  style={{ padding: "14px 24px", minHeight: "48px" }}
                  onClick={() => addToCart({
                    productId: product.slug,
                    name: product.name,
                    price: product.price,
                    mrp: product.mrp,
                    image: product.images[0] || "",
                    quantity,
                    thickness: selectedThickness,
                    size: selectedSize
                  })}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 flex items-center justify-center gap-2"
                  asChild
                  style={{ padding: "14px 24px", minHeight: "48px" }}
                >
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp Enquiry
                  </a>
                </Button>
              </div>

              {/* Share */}
              <button className="flex items-center gap-1.5 text-sm text-[var(--ink-soft)] hover:text-[var(--burgundy)] transition-colors self-start">
                <Share2 className="w-3.5 h-3.5" />
                Share this product
              </button>

              {/* Trust Badges */}
              {/* <TrustBadges warranty={product.warranty} /> */}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Technical Specifications ── */}
      <section className="pdp-section bg-white">
        <div className="container-site">
          <h2 className="pdp-heading">Technical Specifications</h2>
          <div className="pdp-card" style={{ maxWidth: "720px" }}>
            <SpecsTable specs={product.specifications} />
          </div>
        </div>
      </section>

      {/* ── 4. Description + Use Cases + Benefits ── */}
      <section className="pdp-section">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "var(--space-8)" }}>
            {/* Left — Description + Use Cases */}
            <div>
              <h2 className="pdp-heading">About This Product</h2>
              <p className="text-[#4b5563] leading-relaxed mb-6" style={{ maxWidth: "60ch" }}>
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">#{tag}</Badge>
                ))}
              </div>

              {/* Use Cases */}
              {useCases.length > 0 && (
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[var(--ink)] mb-4">
                    Ideal Use Cases
                  </h3>
                  <div className="pdp-usecases">
                    {useCases.map((uc) => (
                      <span key={uc} className="pdp-usecase-pill">{uc}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Key Benefits */}
            <div>
              <h2 className="pdp-heading">Key Benefits</h2>
              <div className="pdp-benefits">
                {benefits.map(({ icon, title, description }) => {
                  const IconComp = ICON_MAP[icon] ?? Award;
                  return (
                    <div key={title} className="pdp-benefit">
                      <div className="pdp-benefit__icon">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="pdp-benefit__title">{title}</p>
                        <p className="pdp-benefit__desc">{description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Trust Section ── */}
      {/* Already shown inline above via TrustBadges */}

      {/* ── 6. Bulk Enquiry + Brochure ── */}
      {/* <section className="pdp-section bg-white">
        <div className="container-site" style={{ maxWidth: "720px" }}>
          <EnquiryBox productName={product.name} />
        </div>
      </section> */}

      {/* ── 7. Reviews ── */}
      <section className="pdp-section">
        <div className="container-site">
          <h2 className="pdp-heading">Customer Reviews</h2>
          <div className="pdp-card" style={{ maxWidth: "720px" }}>
            <ProductReviews reviews={reviews} />
          </div>
        </div>
      </section>

      {/* ── 8. FAQs ── */}
      <section className="pdp-section bg-white">
        <div className="container-site">
          <h2 className="pdp-heading">Frequently Asked Questions</h2>
          <div className="pdp-card" style={{ maxWidth: "720px" }}>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* ── 9. Related Products ── */}
      {related.length > 0 && (
        <section className="pdp-section" aria-labelledby="related-heading">
          <div className="container-site">
            <SectionHeading
              id="related-heading"
              eyebrow="You May Also Like"
              title="Related Products"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "var(--space-5)" }}>
              {related.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 10. Shipping & Return Policy ── */}
      <section className="pdp-section bg-white">
        <div className="container-site" style={{ maxWidth: "720px" }}>
          <div className="pdp-shipping">
            <h3 className="pdp-shipping__title">Shipping & Return Policy</h3>
            <ul className="pdp-shipping__list">
              <li>Dispatched within 3–5 business days from our Yamuna Nagar plant.</li>
              <li>Delivery via dedicated freight partners to all 28 states.</li>
              <li>Freight charges calculated based on delivery location and order volume.</li>
              <li>Bulk orders (50+ sheets) qualify for free freight on select routes.</li>
            </ul>
            <p className="pdp-shipping__warning">
              ⚠ Cut-to-size sheets cannot be returned or exchanged. Please verify all measurements before placing your order.
            </p>
          </div>
        </div>
      </section>

      <StickyActionBar
        productId={product.slug}
        productName={product.name}
        price={product.price}
        mrp={product.mrp}
        image={product.images[0] || ""}
        selectedThickness={selectedThickness}
        selectedSize={selectedSize}
        inStock={product.inStock}
      />
    </div>
  );
}
