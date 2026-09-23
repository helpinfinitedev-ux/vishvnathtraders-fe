// =============================================================================
// HOME PAGE — assembles all home sections in order
// =============================================================================

import type { Metadata } from "next";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryHighlights } from "@/components/home/CategoryHighlights";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { DistributorCTABanner } from "@/components/home/DistributorCTABanner";

export const metadata: Metadata = {
  title: "WoodCraft Premium | ISI Certified Plywood & Wood Products",
  description:
    "Buy ISI-certified plywood, blockboard, veneer, laminates, and flush doors from WoodCraft Premium — India's trusted manufacturer with 30+ years of excellence.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
      <CategoryHighlights />
      <WhyChooseUs />
      <Testimonials />
      <DistributorCTABanner />
    </>
  );
}
