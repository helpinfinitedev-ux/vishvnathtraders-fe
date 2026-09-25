"use client";

// =============================================================================
// CONTACT PAGE
// =============================================================================

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_CONFIG } from "@/data/siteConfig";
import type { ContactFormData } from "@/types";

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Call Us",
    lines: [SITE_CONFIG.phone, "Mon – Sat, 9 AM – 6 PM IST"],
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [SITE_CONFIG.email, "Response within 24 hours"],
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      `${SITE_CONFIG.address.line1}`,
      `${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state} – ${SITE_CONFIG.address.pin}`,
    ],
    href: "#map",
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: Closed"],
    href: undefined,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const setField = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* Hero */}
      <section className="bg-[#1c1c1c] relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a18] to-[#2d2520]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#c8956c]/8 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8956c] mb-4">Contact</p>
          <h1 className="font-serif text-white font-semibold leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Get in Touch
          </h1>
          <p className="text-white/60 max-w-7xl mx-auto text-lg leading-relaxed">
            Have a product query, bulk order enquiry, or just want to know more? Our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-10 md:py-14">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ paddingTop: "1.55rem", paddingBottom: "1.8rem", paddingRight: "1.8rem", paddingLeft: "1.8rem" }}>
            {CONTACT_CARDS.map(({ icon: Icon, title, lines, href }) => (
              <a
                key={title}
                href={href ?? undefined}
                className="group bg-white p-6 rounded-[18px] border border-[#f0e8de] shadow-[0_2px_12px_rgba(28,28,28,0.05)] hover:shadow-[0_6px_24px_rgba(200,149,108,0.14)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-3"
                style={{ paddingTop: "1.55rem", paddingBottom: "1.8rem", paddingRight: "1.8rem", paddingLeft: "1.8rem" }}
              >
                <div className="w-11 h-11 rounded-[12px] bg-[#f2e8dc] flex items-center justify-center group-hover:bg-[#c8956c]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#c8956c]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1c1c1c] mb-1">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="text-xs text-[#6b7280] leading-relaxed">{line}</p>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div>
              <SectionHeading
                eyebrow="Send a Message"
                title="We'd Love to Hear from You"
                subtitle="Fill in your details and we'll get back to you within one business day."
              />

              <div className="bg-[#fafaf8] rounded-[24px] border border-[#f0e8de]" style={{ padding: "2.5rem" }}>
                {submitted ? (
                  <div className="flex flex-col items-center text-center py-10 gap-4">
                    <div className="w-20 h-20 rounded-full bg-[#f2e8dc] flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-[#c8956c]" />
                    </div>
                    <h2 className="font-serif text-2xl font-semibold text-[#1c1c1c]">Message Sent!</h2>
                    <p className="text-base text-[#6b7280] leading-relaxed max-w-sm">
                      Thank you, <strong>{form.name}</strong>. We&apos;ll reply to <strong>{form.email}</strong> within 24 hours.
                    </p>
                    <Button variant="outline" size="lg" onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); }} className="mt-2">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="flex flex-col" style={{ gap: "1.5rem" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.5rem" }}>
                      <FormField
                        inputSize="lg"
                        label="Your Name"
                        id="contact-name"
                        type="text"
                        placeholder="Full name"
                        required
                        value={form.name}
                        onChange={(e) => setField("name", (e.target as HTMLInputElement).value)}
                      />
                      <FormField
                        inputSize="lg"
                        label="Email"
                        id="contact-email"
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
                        label="Phone"
                        id="contact-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setField("phone", (e.target as HTMLInputElement).value)}
                      />
                      <FormField
                        inputSize="lg"
                        label="Subject"
                        id="contact-subject"
                        type="text"
                        placeholder="How can we help?"
                        required
                        value={form.subject}
                        onChange={(e) => setField("subject", (e.target as HTMLInputElement).value)}
                      />
                    </div>
                    <FormField
                      inputSize="lg"
                      as="textarea"
                      label="Message"
                      id="contact-message"
                      placeholder="Tell us about your requirement or query…"
                      rows={6}
                      required
                      value={form.message}
                      onChange={(e) => setField("message", (e.target as HTMLTextAreaElement).value)}
                    />
                    <Button type="submit" variant="wood" size="lg" className="w-full" style={{ padding: "1.25rem", fontSize: "1.1rem", marginTop: "0.5rem" }} loading={loading}>
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Map + Address */}
            <div className="flex flex-col gap-6">
              {/* Map placeholder */}
              <div
                id="map"
                className="relative rounded-[20px] overflow-hidden border border-[#f0e8de] bg-[#f2e8dc] flex items-center justify-center"
                style={{ height: 520 }}
                aria-label="Office location map placeholder"
              >
                {/* Styled map placeholder */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <pattern id="mapgrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c8956c" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapgrid)" />
                </svg>
                <div className="relative z-10 text-center">
                  <MapPin className="w-10 h-10 text-[#c8956c] mx-auto mb-2" />
                  <p className="font-semibold text-[#1c1c1c] text-sm">{SITE_CONFIG.address.city}</p>
                  <p className="text-xs text-[#6b7280]">{SITE_CONFIG.address.state}, India</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs font-medium text-[#c8956c] hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Full address card */}
              <div className="bg-white rounded-[18px] border border-[#f0e8de] p-6" style={{ paddingTop: "1.55rem", paddingBottom: "1.8rem", paddingRight: "1.8rem", paddingLeft: "1.8rem" }}>
                <h3 className="font-serif text-base font-semibold text-[#1c1c1c] mb-4">Corporate Office & Plant</h3>
                <address className="not-italic space-y-2 text-sm text-[#4b5563] leading-relaxed">
                  <p>{SITE_CONFIG.address.line1}</p>
                  <p>{SITE_CONFIG.address.line2}</p>
                  <p>{SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} – {SITE_CONFIG.address.pin}</p>
                  <p className="font-medium text-[#1c1c1c] mt-3">CIN: U20101HR1994PLC012345</p>
                  <p>GST: 06ABCDE1234F1Z5</p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
