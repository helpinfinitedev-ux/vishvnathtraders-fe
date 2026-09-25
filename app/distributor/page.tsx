"use client";

// =============================================================================
// DISTRIBUTOR / ENQUIRY PAGE
// =============================================================================

import { useState } from "react";
import type { Metadata } from "next";
import { CheckCircle2, TrendingUp, Headphones, Package, MapPin } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { EnquiryFormData } from "@/types";

const INITIAL_FORM: EnquiryFormData = {
  name: "",
  businessName: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  enquiryType: "distributor",
  message: "",
};

const BENEFITS = [
  { icon: TrendingUp, title: "Competitive Margins", desc: "Industry-leading margins with quarterly incentive programs." },
  { icon: Package, title: "Full Product Range", desc: "Access to our complete portfolio — 500+ SKUs across all categories." },
  { icon: Headphones, title: "Dedicated Support", desc: "Your own relationship manager and technical sales support." },
  { icon: MapPin, title: "Territory Exclusivity", desc: "Defined territories with protection against channel conflict." },
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

export default function DistributorPage() {
  const [form, setForm] = useState<EnquiryFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = <K extends keyof EnquiryFormData>(key: K, value: EnquiryFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay — replace with real API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* Hero */}
      <section className="bg-[#1c1c1c] relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a18] to-[#2d2520]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#c8956c]/8 rounded-full blur-[120px]" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8956c] mb-4">Partner With Us</p>
          <h1 className="font-serif text-white font-semibold leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Become a WoodCraft Distributor
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Join our pan-India network of authorised distributors and dealers. Premium products, strong margins, and full marketing support.
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Why Partner with Us"
            title="Distributor Benefits"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-0" >
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#fafaf8] p-6 rounded-[18px] border border-[#f0e8de] text-center" style={{ paddingTop: "1.55rem", paddingBottom: "1.55rem", paddingRight: "1.55rem", paddingLeft: "1.55rem" }}>
                <div className="w-12 h-12 rounded-[12px] bg-[#f2e8dc] flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5.5 h-5.5 text-[#c8956c]" />
                </div>
                <h3 className="font-serif text-base font-semibold text-[#1c1c1c] mb-1.5">{title}</h3>
                <p className="text-lg text-[#6b7280] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="section-pad bg-[#fafaf8]" id="enquiry-form">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_560px] gap-12 lg:gap-16 items-start">
            {/* Left — info */}
            <div className="flex flex-col sticky top-24" style={{ marginTop: "4px", marginLeft: "1rem" }}>
              <div className="mb-2">
                <span className="text-sm font-bold tracking-widest text-[#c8956c] uppercase mb-3 block">
                  Apply Now
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-[#1c1c1c] leading-tight mb-4">
                  Send Us Your Enquiry
                </h2>
                <p className="text-lg lg:text-xl text-[#6b7280] leading-relaxed max-w-lg" style={{ marginTop: "4px" }} >
                  Join our growing network of premium plywood and veneer distributors. Fill in the form and our partnership team will get back to you within 48 hours.
                </p>
              </div>

              <div className="mt-10 bg-white rounded-[24px] p-8 lg:p-10 border border-[#f0e8de] shadow-[0_8px_30px_rgba(28,28,28,0.04)]" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <h3 className="font-serif text-2xl font-semibold text-[#1c1c1c] mb-8" style={{ marginBottom: "2rem", marginLeft: "2rem", marginTop: "2rem" }}>What you get as a partner:</h3>
                <div className="flex flex-col gap-6 " style={{ marginLeft: "2rem", marginBottom: "2rem" }}>
                  {[
                    "Minimum investment requirements shared on request",
                    "Territory mapping and market analysis provided",
                    "Complete onboarding training and product certification",
                    "Point-of-sale marketing materials and samples provided",
                    "Quarterly performance-linked incentives",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-5 text-lg text-[#4b5563]">
                      <div className="w-8 h-8 rounded-full bg-[#f2e8dc] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-[#c8956c]" />
                      </div>
                      <span className="leading-relaxed font-medium" >{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white rounded-[24px] border border-[#f0e8de] shadow-[0_4px_24px_rgba(28,28,28,0.07)]" style={{ padding: "2.5rem" }}>
              {submitted ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <div className="w-20 h-20 rounded-full bg-[#f2e8dc] flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#c8956c]" />
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-[#1c1c1c]">Enquiry Received!</h2>
                  <p className="text-base text-[#6b7280] leading-relaxed max-w-sm">
                    Thank you, <strong>{form.name}</strong>. Our partnership team will contact you within 48 hours.
                  </p>
                  <Button variant="wood" size="lg" onClick={() => setSubmitted(false)} className="mt-2">
                    Submit Another Enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Distributor enquiry form" className="flex flex-col" style={{ gap: "1rem" }}>
                  <h2 className="font-serif text-2xl font-semibold text-[#1c1c1c] mb-2">Distributor / Dealer Enquiry</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1rem" }}>
                    <FormField
                      inputSize="lg"
                      label="Full Name"
                      id="name"
                      type="text"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={(e) => setField("name", (e.target as HTMLInputElement).value)}
                    />
                    <FormField
                      inputSize="lg"
                      label="Business Name"
                      id="businessName"
                      type="text"
                      placeholder="Firm / Company name"
                      required
                      value={form.businessName}
                      onChange={(e) => setField("businessName", (e.target as HTMLInputElement).value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1rem" }}>
                    <FormField
                      inputSize="lg"
                      label="Phone Number"
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      value={form.phone}
                      onChange={(e) => setField("phone", (e.target as HTMLInputElement).value)}
                    />
                    <FormField
                      inputSize="lg"
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setField("email", (e.target as HTMLInputElement).value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.5rem" }}>
                    <FormField
                      inputSize="lg"
                      label="City"
                      id="city"
                      type="text"
                      placeholder="Your city"
                      required
                      value={form.city}
                      onChange={(e) => setField("city", (e.target as HTMLInputElement).value)}
                    />
                    <FormField
                      inputSize="lg"
                      as="select"
                      label="State"
                      id="state"
                      required
                      value={form.state}
                      onChange={(e) => setField("state", (e.target as HTMLSelectElement).value)}
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </FormField>
                  </div>

                  <div>
                    <FormField
                      inputSize="lg"
                      as="select"
                      label="Enquiry Type"
                      id="enquiryType"
                      required
                      value={form.enquiryType}
                      onChange={(e) => setField("enquiryType", (e.target as HTMLSelectElement).value as EnquiryFormData["enquiryType"])}
                    >
                      <option value="distributor">Become a Distributor</option>
                      <option value="dealer">Become a Dealer</option>
                      <option value="bulk-order">Bulk Order Enquiry</option>
                      <option value="other">Other</option>
                    </FormField>
                  </div>

                  <div>
                    <FormField
                      inputSize="lg"
                      as="textarea"
                      label="Message"
                      id="message"
                      placeholder="Tell us about your business, the products you're interested in, and your target area…"
                      rows={2}
                      value={form.message}
                      onChange={(e) => setField("message", (e.target as HTMLTextAreaElement).value)}
                    />
                  </div>

                  <Button type="submit" variant="wood" size="lg" className="w-full" style={{ padding: "1.25rem", fontSize: "1.1rem", marginTop: "0.5rem" }} loading={loading}>
                    Submit Enquiry
                  </Button>

                  <p className="text-sm text-[#9ca3af] text-center mt-2">
                    We respect your privacy. Your information will not be shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
