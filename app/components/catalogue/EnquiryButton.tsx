"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import type { CatalogueProduct } from "@/types";

interface EnquiryButtonProps {
  product: CatalogueProduct;
  className?: string;
  variant?: "primary" | "outline" | "full";
}

export function EnquiryButton({ product, className, variant = "primary" }: EnquiryButtonProps) {
  // Construct message
  let message = `Hello, I am interested in enquiring about ${product.name}.`;
  if (product.brand) message += ` Brand: ${product.brand}.`;
  if (product.sizes && product.sizes.length) message += ` Sizes: ${product.sizes.join(", ")}.`;
  if (product.thickness && product.thickness.length) message += ` Thickness: ${product.thickness.join(", ")}.`;

  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodedMessage}`;

  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer";

  const variants = {
    primary: "bg-[#25D366] text-white hover:bg-[#128C7E] px-4 py-2",
    outline: "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-2",
    full: "bg-[#25D366] text-white hover:bg-[#128C7E] w-full py-3",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseClasses, variants[variant], className)}
    >
      <MessageCircle className="w-4 h-4" />
      Price on Enquiry
    </a>
  );
}
