"use client";

// =============================================================================
// HeroBanner — full-viewport hero with animated text and dual CTA
// Uses CSS gradients + SVG wood-grain texture for a clean light minimal look
// =============================================================================

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroBanner() {
  const scrollToContent = () => {
    document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#fafaf8]"
      aria-label="Hero banner"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fafaf8] to-[#f5ede4]" />

        {/* Wood-grain SVG texture overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Warm light accent top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#c8956c]/10 blur-[120px]" />
        {/* Subtle bottom-left glow */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#c8956c]/5 blur-[80px]" />

        {/* Diagonal wood plank decorative shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] opacity-30 hidden lg:block">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="absolute w-full"
              style={{
                top: `${i * 16 - 4}%`,
                height: "14%",
                background: `linear-gradient(180deg, transparent, rgba(200,149,108,${0.04 + i * 0.01}), transparent)`,
                transform: "skewY(-3deg)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container-site relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7 animate-fade-up" style={{ animationDelay: "0ms" }}>
            <span className="h-px w-10 bg-[#c8956c]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8956c]">
              ISI Certified • 30+ Years • Pan-India
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-[#1c1c1c] font-semibold leading-[1.1] mb-6 animate-fade-up"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", animationDelay: "80ms" }}
          >
            Engineered for
            <span className="block text-[#c8956c] italic mt-1">Excellence.</span>
            Built to Last.
          </h1>

          {/* Subtext */}
          <p
            className="text-[#4b5563] text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Premium plywood, blockboard, veneer, and laminates — crafted to the highest ISI standards
            and trusted by architects, designers, and builders across India.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-16 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <Button variant="wood" size="lg" asChild>
              <Link href="/products" className="flex items-center gap-2">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/distributor">Get a Quote</Link>
            </Button>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-8 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            {[
              { value: "30+", label: "Years of Expertise" },
              { value: "500+", label: "Products in Range" },
              { value: "5000+", label: "Satisfied Clients" },
              { value: "28", label: "States Served" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-2xl md:text-3xl font-semibold text-[#1c1c1c]">{value}</p>
                <p className="text-xs text-[#6b7280] mt-0.5 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#c8956c]/60 hover:text-[#c8956c] transition-colors cursor-pointer group"
        aria-label="Scroll to products"
      >
        <span className="text-xs tracking-widest uppercase text-[#9ca3af]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
