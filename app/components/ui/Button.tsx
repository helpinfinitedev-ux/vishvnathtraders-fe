// =============================================================================
// Button — pill-style CTA primitive matching the Navbar Distributor button
// Pill shape, uppercase Oswald font, consistent hover lift across the whole site
// =============================================================================

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "wood";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

// ── Colour / shadow ────────────────────────────────────────────────────────────
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  // dark filled — matches Navbar primary
  primary: [
    "bg-[#1c1c1c] text-white",
    "hover:bg-[#2a2a2a] hover:-translate-y-[2px] hover:shadow-lg",
    "active:bg-[#111] active:translate-y-0 active:scale-[0.98]",
    "shadow-md",
  ].join(" "),

  // soft warm fill
  secondary: [
    "bg-[#f2e8dc] text-[#1c1c1c]",
    "hover:bg-[#e8ddd4] hover:-translate-y-[2px] hover:shadow-md",
    "active:bg-[#ddd4c8] active:translate-y-0 active:scale-[0.98]",
  ].join(" "),

  // wood accent border → fills on hover
  outline: [
    "border-2 border-[#c8956c] text-[#1c1c1c] bg-transparent",
    "hover:bg-[#c8956c] hover:text-white hover:-translate-y-[2px] hover:shadow-md",
    "active:translate-y-0 active:scale-[0.98]",
  ].join(" "),

  // transparent / ghost
  ghost: [
    "text-[#1c1c1c] bg-transparent",
    "hover:bg-[#f2e8dc] hover:-translate-y-[1px]",
    "active:bg-[#e8ddd4] active:scale-[0.98]",
  ].join(" "),

  // wood accent filled — matches Navbar Distributor pill & HeroBanner primary
  wood: [
    "bg-[#c8956c] text-white",
    "hover:bg-[#a8744e] hover:-translate-y-[2px]",
    "hover:shadow-[0_8px_24px_-4px_rgba(200,149,108,0.55)]",
    "active:bg-[#906040] active:translate-y-0 active:scale-[0.98]",
    "shadow-[0_4px_14px_-2px_rgba(200,149,108,0.35)]",
  ].join(" "),
};

// ── Size — pill shape everywhere, Oswald font, uppercase ────────────────────────
const SIZE_STYLES: Record<ButtonSize, string> = {
  // chip / tag size
  sm:   "text-xs  font-semibold tracking-[0.08em] uppercase px-4    py-2     rounded-full gap-1.5",
  // standard CTA
  md:   "text-xs  font-semibold tracking-[0.08em] uppercase px-5    py-2.5   rounded-full gap-2",
  // section CTA — matches Navbar Distributor button exactly
  lg:   "text-xs  font-semibold tracking-[0.08em] uppercase px-[1.1rem] py-[0.55rem] rounded-full gap-2",
  // hero-scale
  xl:   "text-sm  font-bold    tracking-[0.09em] uppercase px-8    py-[14px] rounded-full gap-2.5",
  // icon square
  icon: "p-3 rounded-full",
};

// ── Base classes shared by all buttons ─────────────────────────────────────────
const BASE =
  "inline-flex items-center justify-center " +
  "font-[family-name:var(--font-heading)] " +    // Oswald — same as Navbar
  "transition-all duration-200 ease-out " +
  "cursor-pointer select-none whitespace-nowrap " +
  "focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-[#c8956c] focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

// ── Component ───────────────────────────────────────────────────────────────────
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      asChild = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      BASE,
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      className
    );

    // asChild — clone child element (e.g. Next.js <Link>) with our classes
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<{ className?: string; children?: React.ReactNode }>,
        {
          className: cn(
            (children as React.ReactElement<{ className?: string }>).props.className,
            classes
          ),
          children: (
            <>
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 mr-1" />}
              {(children as React.ReactElement<{ children?: React.ReactNode }>).props.children}
            </>
          ),
        }
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={classes}
        {...props}
      >
        {loading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
