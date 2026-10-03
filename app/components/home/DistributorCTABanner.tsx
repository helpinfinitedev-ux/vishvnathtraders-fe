// =============================================================================
// DistributorCTABanner — image panel left + enquiry card overlapping it
// Requires: Next.js (next/image), lucide-react. NO Tailwind spacing is used:
// all layout lives in the scoped <style> below (prefix .dcb), so your global
// CSS reset cannot remove padding / margin / centering.
// Image: /public/images/distributor-banner.jpg
// =============================================================================

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  distributorType: string;
  honeypot: string;
};

const INITIAL: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  distributorType: "",
  honeypot: "",
};

const BENEFITS = [
  { title: "Premium quality", text: "IS 710 certified plywood" },
  { title: "High margins", text: "Best-in-industry returns" },
  { title: "Dedicated support", text: "A partner manager for your region" },
];

const CSS = `
section.dcb{background:#F4F2EE;padding:96px 0;box-sizing:border-box}
section.dcb *{box-sizing:border-box}
section.dcb .dcb-container{max-width:1240px;margin:0 auto;padding:0 24px}
section.dcb .dcb-stage{position:relative}

/* image panel */
section.dcb .dcb-hero{position:relative;overflow:hidden;width:72%;min-height:700px;border-radius:32px;background:#0f1115;display:flex;flex-direction:column;justify-content:flex-end;padding:56px}
section.dcb .dcb-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.55) 45%,rgba(0,0,0,.1) 100%)}
section.dcb .dcb-copy{position:relative;z-index:2;max-width:520px}
section.dcb .dcb-badge{display:inline-flex;align-items:center;gap:10px;margin:0 0 20px;padding:8px 16px 8px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);backdrop-filter:blur(8px);color:#fff;font-size:14px;font-weight:600}
section.dcb .dcb-badge i{display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#E30613;font-style:normal;font-size:11px;font-weight:700;color:#fff}
section.dcb h2.dcb-title{margin:0 0 20px;color:#fff !important;font-size:52px;line-height:1.12;font-weight:700}
section.dcb p.dcb-sub{margin:0 0 28px;max-width:440px;color:#E5E7EB;font-size:18px;line-height:1.6}
section.dcb ul.dcb-list{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:12px 32px}
section.dcb ul.dcb-list li{display:flex;align-items:center;gap:10px;color:#F3F4F6;font-size:14px}
section.dcb ul.dcb-list li span.t{font-weight:700;color:#fff}
section.dcb ul.dcb-list li span.d{color:#D1D5DB}
section.dcb .dcb-tick{flex-shrink:0;color:#FF4D58}

/* overlapping card */
section.dcb .dcb-card{position:absolute;z-index:5;right:0;top:50%;transform:translateY(-50%);width:480px;padding:36px;border-radius:24px;background:#fff;border:1px solid #F0EEEA;box-shadow:0 40px 80px -24px rgba(0,0,0,.35)}
section.dcb h3.dcb-card-title{margin:0 0 8px;color:#222;font-size:26px;line-height:1.2;font-weight:700}
section.dcb p.dcb-card-sub{margin:0 0 24px;color:#5B6169;font-size:14px;line-height:1.5}
section.dcb form.dcb-form{display:flex;flex-direction:column;gap:16px;margin:0}
section.dcb .dcb-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
section.dcb .dcb-field{display:flex;flex-direction:column;min-width:0}
section.dcb .dcb-field label{margin:0 0 6px 2px;color:#374151;font-size:13px;font-weight:600}
section.dcb .dcb-field label b{color:#E30613;font-weight:600}
section.dcb .dcb-field input,section.dcb .dcb-field select{width:100%;height:48px;padding:0 16px;border:1px solid #E2E0DB;border-radius:12px;background:#FAF9F7;color:#222;font:inherit;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s,background .2s}
section.dcb .dcb-field select{appearance:none;-webkit-appearance:none;padding-right:44px}
section.dcb .dcb-field select.empty{color:#9CA3AF}
section.dcb .dcb-field input::placeholder{color:#9CA3AF}
section.dcb .dcb-field input:hover,section.dcb .dcb-field select:hover{border-color:#CFCBC3}
section.dcb .dcb-field input:focus,section.dcb .dcb-field select:focus{background:#fff;border-color:#E30613;box-shadow:0 0 0 3px rgba(227,6,19,.15)}
section.dcb .dcb-field.err input,section.dcb .dcb-field.err select{border-color:#E30613;background:#FEF4F4}
section.dcb .dcb-field small{margin:6px 0 0 2px;color:#C00510;font-size:12px;font-weight:600}
section.dcb .dcb-selwrap{position:relative}
section.dcb .dcb-chev{position:absolute;top:0;bottom:0;right:16px;display:flex;align-items:center;color:#6B7280;pointer-events:none}
section.dcb button.dcb-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;height:52px;margin:8px 0 0;border:0;border-radius:12px;background:#E30613;color:#fff;font:inherit;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 8px 20px -8px rgba(227,6,19,.6);transition:background .2s}
section.dcb button.dcb-btn:hover{background:#C00510}
section.dcb button.dcb-btn:focus-visible{outline:none;box-shadow:0 0 0 4px rgba(227,6,19,.3)}
section.dcb button.dcb-btn:disabled{opacity:.7;cursor:not-allowed}
section.dcb p.dcb-terms{margin:12px 0 0;text-align:center;color:#6B7280;font-size:12px}
section.dcb .dcb-ok{padding:48px 0;text-align:center}
section.dcb .dcb-ok .ic{display:flex;align-items:center;justify-content:center;width:80px;height:80px;margin:0 auto 24px;border-radius:50%;background:#F0FDF4;border:1px solid #DCFCE7;color:#16A34A}
section.dcb .dcb-ok h3{margin:0 0 12px;color:#222;font-size:26px;font-weight:700}
section.dcb .dcb-ok p{margin:0 auto;max-width:260px;color:#4B5563;font-size:16px}

/* tablet / mobile: card drops below image and overlaps it */
@media (max-width:1023px){
  section.dcb{padding:56px 0}
  section.dcb .dcb-hero{width:100%;min-height:480px;padding:32px 28px 170px}
  section.dcb h2.dcb-title{font-size:36px}
  section.dcb .dcb-card{position:relative;top:auto;right:auto;transform:none;width:auto;max-width:560px;margin:-130px auto 0;padding:28px 22px}
}
@media (max-width:560px){
  section.dcb .dcb-container{padding:0 14px}
  section.dcb .dcb-row{grid-template-columns:1fr}
  section.dcb h2.dcb-title{font-size:30px}
}
`;

export function DistributorCTABanner() {
  const [formData, setFormData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = "Enter your full name";
    if (!formData.email.trim()) e.email = "Enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email";
    if (!formData.phone.trim()) e.phone = "Enter your phone number";
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone))
      e.phone = "Enter a valid phone number";
    if (!formData.company.trim()) e.company = "Enter your company name";
    if (!formData.city.trim()) e.city = "Enter your city";
    if (!formData.distributorType) e.distributorType = "Choose a type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // spam trap
    if (!validate()) return;

    setIsSubmitting(true);
    // TODO: replace with your real API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="dcb" aria-labelledby="distributor-cta-heading">
      <style>{CSS}</style>

      <div className="dcb-container">
        <div className="dcb-stage">
          {/* ───────── Image panel ───────── */}
          <div className="dcb-hero">
            <Image
              src="/images/distributor-banner.jpg"
              alt="WoodCraft plywood sheets in a warehouse"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className="dcb-shade" />

            <div className="dcb-copy">
              <span className="dcb-badge">
                <i>W</i>WoodCraft Partners
              </span>

              <h2 id="distributor-cta-heading" className="dcb-title">
                Grow your business with India&apos;s trusted plywood brand
              </h2>

              <p className="dcb-sub">
                Join our distributor network for premium products, dedicated
                support and margins built to scale.
              </p>

              <ul className="dcb-list">
                {BENEFITS.map((b) => (
                  <li key={b.title}>
                    <CheckCircle2
                      size={20}
                      className="dcb-tick"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="t">{b.title}</span>
                      <span className="d"> – {b.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ───────── Overlapping enquiry card ───────── */}
          <div className="dcb-card">
            {isSuccess ? (
              <div className="dcb-ok" role="status" aria-live="polite">
                <div className="ic">
                  <CheckCircle2 size={40} />
                </div>
                <h3>Application received</h3>
                <p>
                  Thank you for your interest. Our partnership team will
                  contact you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3 className="dcb-card-title">Become a distributor</h3>
                <p className="dcb-card-sub">
                  Fill in your details and we&apos;ll call you back within one
                  working day.
                </p>

                <form noValidate onSubmit={handleSubmit} className="dcb-form">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <Field
                    id="fullName"
                    label="Full name"
                    placeholder="e.g. Rahul Sharma"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                  />

                  <div className="dcb-row">
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                    <Field
                      id="phone"
                      label="Phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                    />
                  </div>

                  <div className="dcb-row">
                    <Field
                      id="company"
                      label="Company"
                      placeholder="Sharma Timbers"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      error={errors.company}
                    />
                    <Field
                      id="city"
                      label="City"
                      placeholder="Mumbai"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                    />
                  </div>

                  <SelectField
                    id="distributorType"
                    label="Partnership type"
                    value={formData.distributorType}
                    onChange={handleChange}
                    error={errors.distributorType}
                    options={["Retailer", "Wholesaler", "Online seller", "Other"]}
                  />

                  <button type="submit" disabled={isSubmitting} className="dcb-btn">
                    {isSubmitting ? "Sending…" : "Submit application"}
                    {!isSubmitting && <ArrowRight size={18} aria-hidden="true" />}
                  </button>
                  <p className="dcb-terms">
                    By submitting, you agree to our Terms and Privacy Policy.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Form fields
// =============================================================================

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
};

function Field({ label, id, error, type = "text", ...props }: FieldProps) {
  return (
    <div className={`dcb-field${error ? " err" : ""}`}>
      <label htmlFor={id}>
        {label} <b>*</b>
      </label>
      <input
        id={id}
        name={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <small id={`${id}-error`}>{error}</small>
      )}
    </div>
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  error?: string;
  options: string[];
};

function SelectField({ label, id, error, value, options, ...props }: SelectProps) {
  return (
    <div className={`dcb-field${error ? " err" : ""}`}>
      <label htmlFor={id}>
        {label} <b>*</b>
      </label>
      <div className="dcb-selwrap">
        <select
          id={id}
          name={id}
          value={value}
          className={value ? "" : "empty"}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        >
          <option value="" disabled hidden>
            Select an option
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="dcb-chev">
          <ChevronDown size={18} aria-hidden="true" />
        </span>
      </div>
      {error && <small id={`${id}-error`}>{error}</small>}
    </div>
  );
}