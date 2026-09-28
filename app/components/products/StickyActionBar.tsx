"use client";

// =============================================================================
// StickyActionBar — mobile-only sticky bottom bar with Call, WhatsApp, Get Quote
// =============================================================================

import { Phone, MessageSquare, ShoppingCart } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

interface StickyActionBarProps {
  productName: string;
  selectedThickness: string;
  selectedSize: string;
  inStock: boolean;
}

export function StickyActionBar({
  productName,
  selectedThickness,
  selectedSize,
  inStock,
}: StickyActionBarProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${productName} (${selectedThickness}, ${selectedSize}). Please share availability and pricing.`
  );

  return (
    <div className="pdp-sticky-bar">
      <a
        href={`tel:${SITE_CONFIG.phone}`}
        className="pdp-sticky-bar__btn pdp-sticky-bar__btn--call"
        aria-label="Call us"
      >
        <Phone className="w-4 h-4" />
        <span>Call</span>
      </a>
      <a
        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pdp-sticky-bar__btn pdp-sticky-bar__btn--whatsapp"
        aria-label="WhatsApp enquiry"
      >
        <MessageSquare className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>
      <button
        type="button"
        className="pdp-sticky-bar__btn pdp-sticky-bar__btn--quote"
        disabled={!inStock}
        aria-label={inStock ? "Get best price" : "Out of stock"}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>{inStock ? "Get Quote" : "Sold Out"}</span>
      </button>
    </div>
  );
}
