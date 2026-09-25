"use client";

// =============================================================================
// Testimonials — auto-cycling carousel of client reviews
// =============================================================================

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => setActive((prev) => (prev + 1) % total), [total]);
  const prev = () => setActive((prev) => (prev - 1 + total) % total);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const current = testimonials[active];

  return (
    <section
      className="section-pad bg-[#fafaf8] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Decorative large quote mark */}
      <div className="absolute top-12 left-8 text-[#f2e8dc] pointer-events-none select-none" aria-hidden="true">
        <Quote className="w-32 h-32 fill-current" />
      </div>

      <div className="container-site relative z-10">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Client Stories"
          title="Trusted by Industry Leaders"
          subtitle="Hear what architects, interior designers, and furniture makers say about WoodCraft Premium."
          centered
        />

        <div className="max-w-3xl mx-auto">
          {/* Main testimonial card */}
          <div
            key={active}
            className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_4px_32px_rgba(200,149,108,0.12)] border border-[#f0e8de] animate-fade-up"
            style={{ padding: "1.55rem 1.8rem" }}
          >
            {/* Stars */}
            <StarRating rating={current.rating} size="md" className="mb-6" />

            {/* Quote */}
            <blockquote className="font-serif text-xl md:text-2xl text-[#1c1c1c] leading-relaxed italic mb-8">
              &ldquo;{current.message}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4">
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c8956c] to-[#a8744e] flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-lg">
                  {current.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[#1c1c1c] text-sm">{current.name}</p>
                <p className="text-xs text-[#c8956c]">{current.role}</p>
                <p className="text-xs text-[#9ca3af]">{current.company}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Prev button */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#e8ddd4] flex items-center justify-center text-[#6b7280] hover:border-[#c8956c] hover:text-[#c8956c] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === active
                      ? "w-6 h-2 bg-[#c8956c]"
                      : "w-2 h-2 bg-[#e8ddd4] hover:bg-[#c8956c]/50"
                  )}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#e8ddd4] flex items-center justify-center text-[#6b7280] hover:border-[#c8956c] hover:text-[#c8956c] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
