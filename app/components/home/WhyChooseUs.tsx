// =============================================================================
// WhyChooseUs — USP section with icon grid
// =============================================================================

import {
  Shield,
  Factory,
  Truck,
  Ruler,
  Leaf,
  Headphones,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { USP_ITEMS } from "@/data/siteConfig";

// Maps icon string names to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Factory,
  Truck,
  Ruler,
  Leaf,
  HeadphonesIcon: Headphones,
};

export function WhyChooseUs() {
  return (
    <section
      className="section-pad bg-[#fafaf8] relative overflow-hidden border-y border-[#f0e8de]"
      aria-labelledby="usp-heading"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="woodgrain" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q30 5 60 10" stroke="#c8956c" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#woodgrain)" />
        </svg>
      </div>

      {/* Warm glow accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[#c8956c]/8 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <SectionHeading
          id="usp-heading"
          eyebrow="Why WoodCraft"
          title="Built on Trust & Quality"
          subtitle="Three decades of manufacturing expertise, ISI certifications, and a commitment to delivering consistently excellent products — every time."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {USP_ITEMS.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Shield;

            return (
              <div
                key={item.id}
                className="group flex flex-col gap-4 p-6 md:p-7 rounded-[20px] bg-white border border-[#f0e8de] shadow-[0_2px_12px_rgba(28,28,28,0.05)] hover:shadow-[0_8px_32px_rgba(200,149,108,0.12)] hover:border-[#c8956c] hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 60}ms`, padding: "1.25rem 1.5rem" }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-[12px] bg-[#c8956c]/15 flex items-center justify-center group-hover:bg-[#c8956c]/25 transition-colors duration-300">
                  <Icon className="w-5.5 h-5.5 text-[#c8956c]" aria-hidden="true" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1c1c1c] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
