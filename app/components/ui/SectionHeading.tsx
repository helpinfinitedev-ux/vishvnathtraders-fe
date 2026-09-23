// =============================================================================
// SectionHeading — consistent section title + subtitle + accent bar
// Usage: <SectionHeading title="Our Products" subtitle="..." centered />
// =============================================================================

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string; // for aria-labelledby targets
  title: string;
  subtitle?: string;
  eyebrow?: string; // small label above the title
  centered?: boolean;
  light?: boolean; // for dark backgrounds
  className?: string;
}

export function SectionHeading({
  id,
  title,
  subtitle,
  eyebrow,
  centered = false,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        centered && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.15em] mb-3",
            light ? "text-[#c8956c]" : "text-[#c8956c]"
          )}
        >
          {eyebrow}
        </p>
      )}

      {/* Title with accent bar */}
      <div className={cn("relative inline-block", centered && "mx-auto")}>
        <h2
          id={id}
          className={cn(
            "font-serif text-3xl md:text-4xl lg:text-[2.625rem] font-semibold leading-tight",
            light ? "text-white" : "text-[#1c1c1c]"
          )}
        >
          {title}
        </h2>
        {/* Accent underline bar */}
        <span
          className={cn(
            "block mt-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#c8956c] to-transparent",
            centered && "mx-auto"
          )}
          aria-hidden="true"
        />
      </div>

      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base md:text-lg leading-relaxed",
            centered && "mx-auto",
            light ? "text-white/70" : "text-[#6b7280]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
