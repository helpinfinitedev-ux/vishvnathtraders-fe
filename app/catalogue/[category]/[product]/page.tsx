"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { use } from "react";
import { MessageSquare, Share2, Award, Shield, Truck, Timer } from "lucide-react";
import { PageBanner } from "@/components/ui/PageBanner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { VariantSelector } from "@/components/products/VariantSelector";
import { TrustBadges } from "@/components/products/TrustBadges";
import { SITE_CONFIG } from "@/data/siteConfig";
import { getCatalogueProductBySlug } from "@/data/catalogue";
import { getCategoryBySlug } from "@/data/categories";

// Fallback features for catalogue items
const DEFAULT_BENEFITS = [
  { icon: Award, title: "Premium Quality", description: "Sourced and manufactured to meet high industry standards." },
  { icon: Shield, title: "Durability Guaranteed", description: "Built to last with rigorous quality checks." },
  { icon: Truck, title: "Pan-India Delivery", description: "Timely delivery to your site across all 28 states." },
  { icon: Timer, title: "Expert Support", description: "Dedicated account support for your orders." },
];

export default function CatalogueProductPage() {
  const params = useParams();
  const productSlug = params.product as string;
  const categorySlug = params.category as string;

  const product = getCatalogueProductBySlug(productSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!product || !category || product.category !== category.slug) {
    notFound();
  }

  const defaultThickness = product.thickness && product.thickness.length > 0 ? product.thickness[0] : "";
  const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "";

  const [selectedThickness, setSelectedThickness] = useState(defaultThickness);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(1);

  const brand = product.brand ?? "WoodCraft Premium";

  // Build whatsapp message
  let message = `Hi, I'm interested in enquiring about ${product.name}.`;
  if (product.brand) message += ` Brand: ${product.brand}.`;
  if (selectedThickness) message += ` Thickness: ${selectedThickness}.`;
  if (selectedSize) message += ` Size: ${selectedSize}.`;
  message += ` Qty: ${quantity}. Please share availability and pricing.`;
  const whatsappMessage = encodeURIComponent(message);

  return (
    <div className="pdp-page bg-[#fafaf8] min-h-screen">
      {/* ── 1. Page Banner ── */}
      <PageBanner
        title={product.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Catalogue", href: `/catalogue/${category.slug}` },
          { label: category.name, href: `/catalogue/${category.slug}` },
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
              {/* Brand + Category */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--burgundy)] mb-2">
                  {[category.name, brand, product.subcategory].filter(Boolean).join(" • ")}
                </p>
                <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[var(--ink)] leading-tight mb-3">
                  {product.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-1">
                  <Badge variant="success" className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available on Order
                  </Badge>
                  {product.type && <Badge variant="outline">{product.type}</Badge>}
                  {product.productLine && <Badge variant="outline">{product.productLine}</Badge>}
                </div>
              </div>

              {/* Short description */}
              {product.description && (
                <p className="text-[var(--ink-soft)] leading-relaxed text-[0.95rem]">
                  {product.description}
                </p>
              )}

              {/* Variant Selectors */}
              <div className="flex flex-col" style={{ gap: "var(--space-5)" }}>
                {product.thickness && product.thickness.length > 0 && (
                  <VariantSelector
                    label="Thickness"
                    options={product.thickness}
                    selected={selectedThickness}
                    onSelect={setSelectedThickness}
                  />
                )}
                {product.sizes && product.sizes.length > 0 && (
                  <VariantSelector
                    label="Size"
                    options={product.sizes}
                    selected={selectedSize}
                    onSelect={setSelectedSize}
                  />
                )}
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-[var(--ink)] mb-3">Quantity required</p>
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
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] border-none"
                  asChild
                  style={{ padding: "14px 24px", minHeight: "48px" }}
                >
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Enquire on WhatsApp
                  </a>
                </Button>
              </div>

              {/* Share */}
              <button className="flex items-center gap-1.5 text-sm text-[var(--ink-soft)] hover:text-[var(--burgundy)] transition-colors self-start">
                <Share2 className="w-3.5 h-3.5" />
                Share this product
              </button>

              {/* Trust Badges */}
              <TrustBadges />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Key Benefits ── */}
      <section className="pdp-section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "var(--space-8)" }}>
            {/* Left — Description */}
            <div>
              <h2 className="pdp-heading">About This Product</h2>
              <p className="text-[#4b5563] leading-relaxed mb-6" style={{ maxWidth: "60ch" }}>
                {product.description || "Premium quality product tailored for your architectural and interior needs. Please contact us for detailed specifications, usage guidelines, and custom requirements."}
              </p>
              
              {/* Extra details from product object */}
              <div className="mt-8 space-y-4">
                {product.brand && (
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-sm text-[var(--color-muted)] font-medium">Brand</span>
                    <span className="text-sm font-semibold text-[var(--color-primary)]">{product.brand}</span>
                  </div>
                )}
                {product.productLine && (
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-sm text-[var(--color-muted)] font-medium">Product Line</span>
                    <span className="text-sm font-semibold text-[var(--color-primary)]">{product.productLine}</span>
                  </div>
                )}
                {product.type && (
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-sm text-[var(--color-muted)] font-medium">Material Type</span>
                    <span className="text-sm font-semibold text-[var(--color-primary)]">{product.type}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right — Key Benefits */}
            <div>
              <h2 className="pdp-heading">Key Benefits</h2>
              <div className="pdp-benefits">
                {DEFAULT_BENEFITS.map(({ icon: IconComp, title, description }) => (
                  <div key={title} className="pdp-benefit">
                    <div className="pdp-benefit__icon">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="pdp-benefit__title">{title}</p>
                      <p className="pdp-benefit__desc">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ── Shipping Info ── */}
      <section className="pdp-section">
        <div className="container-site" style={{ maxWidth: "720px" }}>
          <div className="pdp-shipping">
            <h3 className="pdp-shipping__title">Ordering & Shipping Information</h3>
            <ul className="pdp-shipping__list">
              <li>Orders are customized based on requirements and availability.</li>
              <li>Delivery via dedicated freight partners to all 28 states.</li>
              <li>Freight charges calculated based on delivery location and order volume.</li>
              <li>Bulk orders qualify for special pricing and freight terms.</li>
            </ul>
            <p className="pdp-shipping__warning mt-4 text-[#d97706] font-medium text-sm flex gap-2">
              <span aria-hidden="true">⚠</span> Contact our sales team via WhatsApp to get an exact quote and lead time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
