"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/siteConfig";
import { Box } from "lucide-react";

interface CatalogueGridProps {
  category: {
    name: string;
    slug: string;
  };
  allProducts: any[];
}

const CSS = `
.cg-page * { box-sizing: border-box; }
.cg-page {
  background: #F7F1E7;
  min-height: 100vh;
  font-family: inherit;
}
.cg-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 32px 72px;
}
.cg-header {
  text-align: center;
}
.cg-eyebrow {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6F1726;
  margin-bottom: 8px;
}
.cg-h1 {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: #52121D;
  line-height: 0.95;
  margin: 0;
}
.cg-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 36px;
}
.cg-chip {
  font: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid #D8C3A5;
  background: transparent;
  color: #52121D;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.cg-chip[aria-pressed="true"] {
  background: #6F1726;
  border-color: #6F1726;
  color: #F7F1E7;
}
.cg-count {
  text-align: center;
  font-size: 14px;
  color: #6B5A55;
  margin-top: 12px;
  margin-bottom: 44px;
}
.cg-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}
.cg-card {
  display: flex;
  flex-direction: column;
}
.cg-img-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(135deg, #EFE4D2, #E2D0B3);
  margin-bottom: 20px;
}
.cg-img-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  padding: 24px;
}
.cg-img {
  object-fit: contain;
  transition: transform 400ms ease;
}
.cg-card:hover .cg-img {
  transform: scale(1.04);
}
.cg-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  color: #52121D;
}
.cg-fallback-name {
  font-size: 16px;
  font-weight: 700;
}
.cg-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 4px;
  flex-grow: 1;
}
.cg-card-cat {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #6F1726;
  margin: 0;
}
.cg-card-title {
  font-family: inherit;
  font-size: 34px;
  font-weight: 700;
  color: #52121D;
  line-height: 1.05;
  margin: 0;
  text-decoration: none;
}
.cg-card-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #6B5A55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  flex-grow: 1;
}
.cg-card-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: #6F1726;
  font-size: 15px;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  margin-top: auto;
}
.cg-empty {
  text-align: center;
  padding: 64px 0;
}
.cg-empty-text {
  color: #52121D;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}
button:focus-visible, a:focus-visible {
  outline: 3px solid rgba(111, 23, 38, 0.4);
  outline-offset: 2px;
}

@media (max-width: 1024px) {
  .cg-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}
@media (max-width: 640px) {
  .cg-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .cg-container {
    padding-left: 16px;
    padding-right: 16px;
  }
  .cg-h1 {
    font-size: 2.5rem;
  }
  .cg-chips {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .cg-chips::-webkit-scrollbar {
    display: none;
  }
}
`;

function ProductCard({ product, categorySlug }: { product: any, categorySlug: string }) {
  const [imgError, setImgError] = useState(false);
  const href = `/catalogue/${categorySlug}/${product.slug}`;

  const defaultThickness = product.thickness && product.thickness.length > 0 ? product.thickness[0] : "";
  const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "";
  
  let message = `Hi, I'm interested in enquiring about ${product.name}.`;
  if (product.brand) message += ` Brand: ${product.brand}.`;
  if (defaultThickness) message += ` Thickness: ${defaultThickness}.`;
  if (defaultSize) message += ` Size: ${defaultSize}.`;
  message += ` Qty: 1. Please share availability and pricing.`;
  const whatsappMessage = encodeURIComponent(message);
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="cg-card">
      <Link href={href} className="cg-img-frame" aria-label={`View ${product.name}`}>
        {product.images?.[0] && !imgError ? (
          <div className="cg-img-wrap">
            <Image 
              src={product.images[0]} 
              alt={product.name} 
              fill 
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="cg-img" 
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div className="cg-fallback">
            <Box size={32} />
            <span className="cg-fallback-name">{product.name}</span>
          </div>
        )}
      </Link>
      
      <div className="cg-card-body">
        <p className="cg-card-cat">{product.subcategory || product.category}</p>
        <Link href={href} className="cg-card-title font-serif">{product.name}</Link>
        <p className="cg-card-desc">{product.description}</p>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="cg-card-link">
          Price on enquiry
        </a>
      </div>
    </div>
  );
}

export function CatalogueGrid({ category, allProducts }: CatalogueGridProps) {
  const availableSubcategories = useMemo(() => {
    const subs = new Set<string>();
    allProducts.forEach(p => {
      if (p.subcategory) subs.add(p.subcategory);
    });
    return Array.from(subs);
  }, [allProducts]);

  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return allProducts;
    return allProducts.filter(p => p.subcategory === activeFilter);
  }, [allProducts, activeFilter]);

  return (
    <div className="cg-page">
      <style>{CSS}</style>
      <div className="cg-container">
        <header className="cg-header">
          <span className="cg-eyebrow">Catalogue</span>
          <h1 className="cg-h1 font-serif">{category.name}</h1>
        </header>

        {availableSubcategories.length > 0 && (
          <div className="cg-chips" role="group" aria-label="Filter products">
            <button
              className="cg-chip"
              role="button"
              aria-pressed={activeFilter === "All"}
              onClick={() => setActiveFilter("All")}
            >
              All
            </button>
            {availableSubcategories.map(sub => (
              <button
                key={sub}
                className="cg-chip"
                role="button"
                aria-pressed={activeFilter === sub}
                onClick={() => setActiveFilter(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        <div className="cg-count" aria-live="polite">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="cg-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} categorySlug={category.slug} />
            ))}
          </div>
        ) : (
          <div className="cg-empty">
            <p className="cg-empty-text">No products in this category yet.</p>
            <button className="cg-chip" onClick={() => setActiveFilter("All")}>
              Show all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
