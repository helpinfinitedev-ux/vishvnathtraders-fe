"use client";

// =============================================================================
// FloatingContactIcons — fixed right-center floating action buttons
// WhatsApp / Call / Email — visible across all pages, subtle hover animation
// =============================================================================

import { useState } from "react";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

interface FloatingAction {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
  bgColor: string;
  hoverColor: string;
}

const ACTIONS: FloatingAction[] = [
  {
    id: "whatsapp",
    icon: MessageCircle,
    label: "WhatsApp",
    href: `https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20WoodCraft%20products.`,
    bgColor: "bg-[#25D366]",
    hoverColor: "hover:bg-[#128C7E]",
  },
  {
    id: "call",
    icon: Phone,
    label: "Call Us",
    href: `tel:${SITE_CONFIG.phone}`,
    bgColor: "bg-[#1c1c1c]",
    hoverColor: "hover:bg-[#333]",
  },
  {
    id: "email",
    icon: Mail,
    label: "Email Us",
    href: `mailto:${SITE_CONFIG.email}`,
    bgColor: "bg-[#c8956c]",
    hoverColor: "hover:bg-[#a8744e]",
  },
];

export function FloatingContactIcons() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
      role="complementary"
      aria-label="Quick contact options"
    >
      {ACTIONS.map(({ id, icon: Icon, label, href, bgColor, hoverColor }) => (
        <a
          key={id}
          href={href}
          target={id === "whatsapp" ? "_blank" : undefined}
          rel={id === "whatsapp" ? "noopener noreferrer" : undefined}
          aria-label={label}
          onMouseEnter={() => setHoveredId(id)}
          onMouseLeave={() => setHoveredId(null)}
          className={cn(
            "relative flex items-center justify-center",
            "w-11 h-11 rounded-full text-white",
            "shadow-[0_4px_16px_rgba(0,0,0,0.18)]",
            "transition-all duration-250 ease-out",
            "hover:scale-110 hover:shadow-[0_6px_20px_rgba(0,0,0,0.22)]",
            bgColor,
            hoverColor
          )}
        >
          <Icon className="w-4.5 h-4.5" />

          {/* Tooltip label on hover */}
          <span
            className={cn(
              "absolute right-14 whitespace-nowrap",
              "bg-[#1c1c1c] text-white text-xs font-medium",
              "px-2.5 py-1 rounded-[6px]",
              "pointer-events-none select-none",
              "transition-all duration-200",
              hoveredId === id
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            )}
          >
            {label}
            {/* Tooltip arrow */}
            <span
              className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#1c1c1c]"
              aria-hidden="true"
            />
          </span>
        </a>
      ))}
    </div>
  );
}
