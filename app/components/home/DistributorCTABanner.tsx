// =============================================================================
// DistributorCTABanner — full-width warm CTA for distributor onboarding
// =============================================================================

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DistributorCTABanner() {
  return (
    <section
      className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32"
      aria-labelledby="distributor-cta-heading"
    >
      {/* Rich wood-tone gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7c4a2a] via-[#c8956c] to-[#e8b07a]" aria-hidden="true" style={{ padding: "1.25rem 1.5rem" }} />

      {/* Subtle grain texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="grain2">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#grain2)" />
      </svg>

      {/* Large decorative circles */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-black/10 pointer-events-none" aria-hidden="true" />

      <div className="container-site relative z-10" style={{ marginTop: "3.25rem", marginBottom: "3.25rem" }}>
        <div className="max-w-7xl mx-auto text-center">
          {/* Headline */}
          <h2
            id="distributor-cta-heading"
            className="font-serif text-white font-semibold leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Become a WoodCraft Distributor
          </h2>

          {/* Body */}
          <p className="text-white/80 text-xl leading-relaxed mb-10 max-w-6xl mx-auto">
            Join our growing network of authorised distributors and dealers across India.
            Enjoy competitive margins, marketing support, and a premium product portfolio
            that sells itself.
          </p>

          {/* Benefits row */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
            {[
              "Competitive Margins",
              "Marketing Support",
              "Pan-India Logistics",
              "Dedicated Account Manager",
              "Technical Training",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-lg text-black/80">
                <span className="w-1.5 h-1.5 rounded-full bg-black/60 shrink-0" />
                {benefit}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4" style={{ marginTop: "1.45rem" }}>
            <Link href="/distributor" className="distributor-btn" style={{ backgroundColor: "#845a16ff" }}>
              Apply Now <ArrowRight size={11} strokeWidth={2.5} />
            </Link>
            <Link href="/contact" className="distributor-btn" style={{ backgroundColor: "#845a16ff" }}>
              Talk to Our Team <ArrowRight size={11} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
