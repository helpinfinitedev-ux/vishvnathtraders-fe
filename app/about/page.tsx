// =============================================================================
// ABOUT PAGE
// =============================================================================

import type { Metadata } from "next";
import { CheckCircle2, Award, Users, TreePine } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DistributorCTABanner } from "@/components/home/DistributorCTABanner";
import { certifications } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about WoodCraft Premium's 30-year legacy, manufacturing process, quality certifications, and commitment to sustainable building materials.",
};

// ── Reusable stat card ────────────────────────────────────────────────────────
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6 bg-[#fafaf8] rounded-[16px] border border-[#f0e8de]">
      <p className="font-serif text-3xl md:text-4xl font-semibold text-[#c8956c] mb-1">{value}</p>
      <p className="text-sm text-[#6b7280]">{label}</p>
    </div>
  );
}

// ── Process step ─────────────────────────────────────────────────────────────
function ProcessStep({
  step,
  title,
  description,
  last = false,
}: {
  step: number;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#c8956c] flex items-center justify-center shrink-0">
          <span className="text-white font-semibold text-sm">{step}</span>
        </div>
        {!last && <div className="w-px flex-1 bg-[#e8ddd4] mt-2 min-h-[40px]" />}
      </div>
      <div className="pb-8">
        <h3 className="font-serif text-lg font-semibold text-[#1c1c1c] mb-1.5">{title}</h3>
        <p className="text-sm text-[#6b7280] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#1c1c1c]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a18] to-[#2d2520]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#c8956c]/10 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8956c] mb-4">Our Story</p>
          <h1 className="font-serif text-white font-semibold leading-tight mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Three Decades of<br />
            <span className="text-[#c8956c] italic">Manufacturing Excellence</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            Since 1994, WoodCraft Premium has been manufacturing high-quality engineered wood products that power
            India&apos;s finest interiors, construction projects, and furniture workshops.
          </p>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <SectionHeading eyebrow="Our Story" title="Built from the Ground Up" />
              <div className="space-y-4 text-[#4b5563] leading-relaxed">
                <p>
                  WoodCraft Premium was founded in 1994 in Yamuna Nagar, Haryana — the heartland of India&apos;s plywood manufacturing
                  industry. What started as a single production line has grown into a state-of-the-art manufacturing facility
                  spanning over 12 acres, with an annual production capacity of 2 million square metres.
                </p>
                <p>
                  Our founder&apos;s vision was simple but ambitious: to manufacture wood products that met international quality
                  standards while remaining accessible to India&apos;s growing construction and furniture industry. Three decades later,
                  that vision drives everything we do.
                </p>
                <p>
                  Today, WoodCraft Premium supplies architects, interior designers, modular kitchen manufacturers, institutional
                  buyers, and a network of 500+ authorised distributors across 28 states.
                </p>
              </div>

              {/* Values checklist */}
              <ul className="mt-8 space-y-3">
                {[
                  "ISI-certified manufacturing at every product line",
                  "In-house quality testing laboratory",
                  "Responsibly sourced, FSC-certified raw materials",
                  "Zero-defect production philosophy",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#374151]">
                    <CheckCircle2 className="w-4 h-4 text-[#c8956c] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "1994", label: "Year Founded" },
                { value: "12 Acres", label: "Manufacturing Plant" },
                { value: "500+", label: "Authorised Distributors" },
                { value: "2M m²", label: "Annual Production Capacity" },
                { value: "28", label: "States Served" },
                { value: "4", label: "ISO / BIS Certifications" },
              ].map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Values ── */}
      <section className="section-pad bg-[#fafaf8]">
        <div className="container-site">
          <SectionHeading
            eyebrow="Mission & Values"
            title="What Drives Us"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Uncompromising Quality",
                body: "Every panel that leaves our factory is tested against Indian and international standards. We believe quality is not a feature — it is the product.",
              },
              {
                icon: Users,
                title: "Customer First",
                body: "From the architect specifying material to the dealer delivering to the site — every stakeholder in our value chain deserves the best experience.",
              },
              {
                icon: TreePine,
                title: "Sustainable Sourcing",
                body: "We are committed to using FSC-certified timber and reducing our environmental footprint through responsible manufacturing practices.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-8 rounded-[20px] border border-[#f0e8de] text-center shadow-[0_2px_12px_rgba(28,28,28,0.05)]">
                <div className="w-14 h-14 rounded-[14px] bg-[#f2e8dc] flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-[#c8956c]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1c1c1c] mb-3">{title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manufacturing Process ── */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <SectionHeading
              eyebrow="How We Make It"
              title="Our Manufacturing Process"
              subtitle="A 7-stage process engineered for consistency, strength, and zero defects."
            />
            <div>
              {[
                { title: "Raw Material Sourcing", desc: "Responsibly sourced timber from FSC-certified forests, graded and seasoned before use." },
                { title: "Log Peeling & Slicing", desc: "State-of-the-art rotary and slicing machines produce veneers with consistent thickness tolerances." },
                { title: "Drying & Conditioning", desc: "Industrial dryers bring moisture content to optimal levels (8–12%) for dimensional stability." },
                { title: "Grading & Sorting", desc: "Every veneer sheet is graded by trained technicians — face, back, and core grades are classified separately." },
                { title: "Gluing & Pressing", desc: "Calibrated adhesive application and hot-press bonding at controlled temperature and pressure." },
                { title: "Trimming & Sizing", desc: "Precision sizing saws and edge-trimming to exact dimensions with ±0.5mm tolerance." },
                { title: "Quality Testing & Dispatch", desc: "In-house QC lab tests for moisture, bond strength, and formaldehyde emission before dispatch.", },
              ].map(({ title, desc }, i, arr) => (
                <ProcessStep
                  key={title}
                  step={i + 1}
                  title={title}
                  description={desc}
                  last={i === arr.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="section-pad bg-[#fafaf8]">
        <div className="container-site">
          <SectionHeading
            eyebrow="Quality Credentials"
            title="Our Certifications"
            subtitle="Independently audited certifications that guarantee the quality, safety, and sustainability of every WoodCraft product."
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white p-6 rounded-[18px] border border-[#f0e8de] shadow-[0_2px_12px_rgba(28,28,28,0.05)] hover:shadow-[0_6px_24px_rgba(200,149,108,0.12)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-[12px] bg-[#f2e8dc] flex items-center justify-center mb-4 text-2xl">
                  🏆
                </div>
                <h3 className="font-serif text-base font-semibold text-[#1c1c1c] mb-1">{cert.name}</h3>
                <p className="text-xs text-[#c8956c] font-medium mb-2">Since {cert.year}</p>
                <p className="text-xs text-[#6b7280] leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DistributorCTABanner />
    </>
  );
}
