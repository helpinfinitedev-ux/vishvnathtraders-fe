"use client";

// =============================================================================
// StickyActionBar — mobile-only sticky bottom bar with Call, WhatsApp, Get Quote
// =============================================================================

import { Phone, MessageSquare, ShoppingCart } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { useCart } from "@/context/CartContext";

interface StickyActionBarProps {
  productId: string;
  productName: string;
  price: number;
  mrp: number;
  image: string;
  selectedThickness: string;
  selectedSize: string;
  inStock: boolean;
}

export function StickyActionBar({
  productId,
  productName,
  price,
  mrp,
  image,
  selectedThickness,
  selectedSize,
  inStock,
}: StickyActionBarProps) {
  const { addToCart } = useCart();
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
        aria-label={inStock ? "Add to Cart" : "Out of stock"}
        onClick={() => {
          if (!inStock) return;
          addToCart({
            productId,
            name: productName,
            price,
            mrp,
            image: image || "",
            quantity: 1,
            thickness: selectedThickness,
            size: selectedSize
          });
        }}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>{inStock ? "Add to Cart" : "Sold Out"}</span>
      </button>
    </div>
  );
}
