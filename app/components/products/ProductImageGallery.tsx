"use client";

// =============================================================================
// ProductImageGallery — thumbnail + main image viewer for product detail page
// =============================================================================

import { useState } from "react";
import { ZoomIn, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square bg-gradient-to-br from-[#f5ede4] to-[#e8ddd4] rounded-[20px] overflow-hidden group border border-[#f0e8de]">
        {/* Wood-grain placeholder */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${i * 9} Q${50 + i * 3} ${i * 9 - 5} 100% ${i * 9}`}
              stroke="#c8956c"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="w-24 h-24 text-[#c8956c]/30" />
        </div>

        {/* Zoom icon on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
            <ZoomIn className="w-4 h-4 text-[#1c1c1c]" />
          </div>
        </div>

        {/* Image number badge */}
        <div className="absolute bottom-3 right-3 text-xs font-medium text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1" role="tablist" aria-label="Product images">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`View image ${i + 1} of ${productName}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative shrink-0 w-20 h-20 rounded-[12px] overflow-hidden border-2 transition-all duration-200",
                "bg-gradient-to-br from-[#f5ede4] to-[#e8ddd4]",
                "flex items-center justify-center",
                i === activeIndex
                  ? "border-[#c8956c] shadow-[0_0_0_2px_rgba(200,149,108,0.25)]"
                  : "border-transparent hover:border-[#e8ddd4]"
              )}
            >
              <Package className="w-8 h-8 text-[#c8956c]/40" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
