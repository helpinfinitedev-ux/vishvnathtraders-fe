"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

// =============================================================================
// HeroBanner — full-viewport hero with animated text and dual CTA
// CTA buttons match the Navbar Distributor pill button style exactly
// =============================================================================

export function HeroBanner() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 lg:py-28"
      aria-label="Hero banner"
      style={{
        backgroundImage: "url('/banner.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Ambient warm glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full bg-[var(--burgundy)]/20 blur-[140px]" />
      </div>

      {/* ── Content ── */}
      <div className="container-site relative z-10 w-full">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">

          {/* Headline */}
          <h1
            className="font-serif text-white font-semibold tracking-tight leading-[1.08] mb-8 animate-fade-up"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.8rem)", animationDelay: "80ms", marginTop: "5rem", color: "#baada0ff" }}
          >
            Engineered for{" "}
            <span className="italic text-[#e8ddd4] font-normal">Excellence.</span>
            <br />
            Built to Last.
          </h1>

          {/* Subtext */}
          <p
            className="text-white/80 text-lg sm:text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl font-normal animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            Premium plywood, blockboard, veneer, and laminates crafted to the highest ISI standards
            and trusted by architects, designers, and builders across India.
          </p>

          {/* ── CTAs ── exact same pill system as Navbar Distributor button ── */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 animate-fade-up"
            style={{ animationDelay: "240ms", marginTop: "4rem" }}
          >
            {/* Primary — wood filled pill */}
            <Link
              href="/products"
              id="hero-cta-products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.55rem 1.4rem",
                borderRadius: "9999px",
                background: "var(--burgundy)",
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 4px 14px -2px rgba(111, 23, 38,0.35)",
                transition: "background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#a8744e";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 24px -4px rgba(111, 23, 38,0.55)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--burgundy)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 4px 14px -2px rgba(111, 23, 38,0.35)";
              }}
            >
              Explore Products
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>

            {/* Secondary — dark pill */}
            <Link
              href="/distributor"
              id="hero-cta-quote"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.55rem 1.4rem",
                borderRadius: "9999px",
                background: "var(--ink)",
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(33, 26, 25,0.18)",
                transition: "background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#2a2a2a";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 6px 18px rgba(33, 26, 25,0.28)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "var(--ink)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 8px rgba(33, 26, 25,0.18)";
              }}
            >
              Get a Quote
              <ExternalLink size={11} strokeWidth={2.5} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}