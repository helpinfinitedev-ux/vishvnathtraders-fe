"use client";

import React, { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { SITE_CONFIG, USP_ITEMS } from "@/data/siteConfig";

const CSS = `
.pi-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  margin-top: 24px;
}
.pi-row {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
  padding: 48px 0;
}
.pi-row-border {
  border-top: 1px solid #EADFCB;
}
.pi-label {
  font-family: inherit;
  font-weight: 700;
  font-size: 30px;
  line-height: 1.05;
  color: #52121D;
  margin: 0;
}
.pi-about-text p {
  font-size: 16px;
  line-height: 1.75;
  color: #4A3A37;
  max-width: 680px;
  margin: 0 0 14px 0;
}
.pi-about-text p:last-child {
  margin-bottom: 0;
}
.pi-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
.pi-chip {
  height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  background: #EFE4D2;
  color: #52121D;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.pi-acc {
  max-width: 720px;
  display: flex;
  flex-direction: column;
}
.pi-acc-item {
  border-bottom: 1px solid #EADFCB;
}
.pi-acc-btn {
  width: 100%;
  min-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #52121D;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
}
.pi-acc-btn:focus-visible {
  outline: 3px solid rgba(111,23,38,.4);
  outline-offset: 2px;
}
.pi-acc-panel {
  overflow: hidden;
}
@media (prefers-reduced-motion: no-preference) {
  .pi-acc-panel {
    transition: height 200ms ease, opacity 200ms ease, visibility 0ms 200ms;
  }
  .pi-acc-panel[aria-hidden="false"] {
    transition: height 200ms ease, opacity 200ms ease, visibility 0ms 0ms;
  }
}
.pi-acc-content {
  font-size: 15px;
  line-height: 1.7;
  color: #4A3A37;
  padding: 4px 0 20px 0;
  margin: 0;
}
.pi-strip {
  background: #52121D;
  border-radius: 28px;
  padding: 36px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 16px;
  margin-bottom: 56px;
}
.pi-strip-title {
  font-family: inherit;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.05;
  color: #F7F1E7;
  margin: 0 0 4px 0;
}
.pi-strip-desc {
  font-size: 15px;
  color: #E7D9C4;
  margin: 0;
}
.pi-strip-btn {
  height: 52px;
  padding: 0 30px;
  background: #D8C3A5;
  color: #52121D;
  font-size: 15px;
  font-weight: 700;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background 0.2s;
  white-space: nowrap;
}
.pi-strip-btn:hover {
  background: #F7F1E7;
}
.pi-strip-btn:focus-visible {
  outline: 3px solid rgba(111,23,38,.4);
  outline-offset: 2px;
}
@media (max-width: 899px) {
  .pi-row {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 40px 0;
  }
  .pi-label {
    font-size: 28px;
  }
}
@media (max-width: 639px) {
  .pi-container {
    padding: 0 16px;
  }
  .pi-strip {
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 22px;
  }
  .pi-strip-title {
    font-size: 32px;
  }
  .pi-strip-btn {
    width: 100%;
  }
}
`;

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="pi-acc-item">
      <button 
        type="button"
        className="pi-acc-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`sect-${title.replace(/\s+/g, '-')}`}
        id={`btn-${title.replace(/\s+/g, '-')}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span>{title}</span>
        {isOpen ? <Minus size={20} color="#6F1726" aria-hidden="true" /> : <Plus size={20} color="#6F1726" aria-hidden="true" />}
      </button>
      <div 
        className="pi-acc-panel"
        id={`sect-${title.replace(/\s+/g, '-')}`}
        role="region"
        aria-labelledby={`btn-${title.replace(/\s+/g, '-')}`}
        aria-hidden={!isOpen}
        style={{
          height: isOpen ? (contentRef.current?.scrollHeight || 'auto') : 0,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden'
        }}
      >
        <div ref={contentRef}>
          <p className="pi-acc-content">{content}</p>
        </div>
      </div>
    </div>
  );
}

export function ProductInfoSections({ product }: { product: any }) {
  if (!product) return null;

  // Description paragraphs
  const hasDescription = !!product.description;
  const paragraphs = hasDescription 
    ? product.description.split(/\r?\n/).filter((p: string) => p.trim() !== "")
    : [];

  // Chips
  const chipSources = [];
  if (product.type) chipSources.push(product.type);
  if (product.brand) chipSources.push(product.brand);
  if (product.productLine) chipSources.push(product.productLine);
  if (product.subcategory) chipSources.push(product.subcategory);
  
  const uniqueChips = Array.from(new Set(chipSources)).slice(0, 4);

  // Accordion rows
  const deliveryUSP = USP_ITEMS.find(u => u.title === "Pan-India Delivery");
  const sharedDelivery = deliveryUSP?.description || "";

  const accordionData = [
    { title: "Care and handling", content: product.careInstructions },
    { title: "Delivery", content: product.deliveryInfo || sharedDelivery },
    { title: "Warranty details", content: product.warrantyTerms }
  ].filter(row => row.content && row.content.trim() !== "");

  // Help Strip
  const hasThickness = Array.isArray(product.thickness) && product.thickness.length > 0;
  const stripTitle = hasThickness ? "Not sure which thickness to pick?" : "Need help choosing the right product?";
  const whatsappMessage = `Hello WoodCraft, I need help choosing for: ${product.name}`;
  const whatsappHref = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pi-container font-sans">
      <style>{CSS}</style>

      {/* Section 1: About this product */}
      {hasDescription && (
        <section className="pi-row">
          <div>
            <h2 className="pi-label font-serif">About this product</h2>
          </div>
          <div className="pi-about-text">
            {paragraphs.map((p: string, idx: number) => (
              <p key={idx}>{p}</p>
            ))}
            {uniqueChips.length > 0 && (
              <div className="pi-chips">
                {uniqueChips.map((chip, idx) => (
                  <span key={idx} className="pi-chip">{chip}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 2: Good to know */}
      {accordionData.length > 0 && (
        <section className="pi-row pi-row-border">
          <div>
            <h2 className="pi-label font-serif">Good to know</h2>
          </div>
          <div className="pi-acc">
            {accordionData.map((row, idx) => (
              <AccordionItem key={idx} title={row.title} content={row.content} />
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Help strip */}
      <section className="pi-strip">
        <div>
          <h2 className="pi-strip-title font-serif">{stripTitle}</h2>
          <p className="pi-strip-desc">Chat with our team and get advice in minutes.</p>
        </div>
        <a 
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="pi-strip-btn"
        >
          WhatsApp enquiry
        </a>
      </section>
    </div>
  );
}
