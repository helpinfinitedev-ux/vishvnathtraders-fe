// =============================================================================
// Button — reusable CTA primitive with variants, sizes, and loading state
// Usage: <Button variant="primary" size="lg">Get Quote</Button>
// =============================================================================

import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "wood";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
  href?: string;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-[#1c1c1c] text-white hover:bg-[#333] active:bg-[#111] shadow-sm",
  secondary:
    "bg-[#f2e8dc] text-[#1c1c1c] hover:bg-[#e8ddd4] active:bg-[#ddd4c8]",
  outline:
    "border-2 border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white",
  ghost:
    "text-[#1c1c1c] hover:bg-[#f2e8dc] active:bg-[#e8ddd4]",
  wood:
    "bg-[#c8956c] text-white hover:bg-[#a8744e] active:bg-[#906040] shadow-sm",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded-[8px] gap-1.5",
  md: "text-sm px-5 py-2.5 rounded-[8px] gap-2",
  lg: "text-base px-7 py-3.5 rounded-[8px] gap-2.5",
  icon: "p-2.5 rounded-[8px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base styles shared across all variants
          "inline-flex items-center justify-center font-medium",
          "transition-all duration-200 ease-out",
          "cursor-pointer select-none whitespace-nowrap",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus-visible:ring-2 focus-visible:ring-[#c8956c] focus-visible:ring-offset-2",
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
