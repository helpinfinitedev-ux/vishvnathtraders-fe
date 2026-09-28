"use client";

// =============================================================================
// EnquiryBox — bulk/dealer pricing enquiry form for product detail page
// =============================================================================

import { useState } from "react";
import { FileDown, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EnquiryBoxProps {
  productName: string;
  className?: string;
}

export function EnquiryBox({ productName, className }: EnquiryBoxProps) {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className={`pdp-enquiry ${className ?? ""}`}>
      <div className="pdp-enquiry__header">
        <h3 className="pdp-enquiry__title">Bulk / Dealer Pricing</h3>
        <p className="pdp-enquiry__sub">
          Get special rates for bulk orders (50+ sheets) or dealer enquiries.
        </p>
      </div>

      {submitted ? (
        <div className="pdp-enquiry__success">
          <CheckCircle2 className="w-8 h-8 text-[#c8956c]" />
          <p>Thank you! We&apos;ll call you back within 2 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="pdp-enquiry__form">
          <input
            type="tel"
            placeholder="Enter your phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pdp-enquiry__input"
            aria-label="Phone number for bulk enquiry"
          />
          <Button type="submit" variant="wood" size="md" className="pdp-enquiry__btn">
            <Send className="w-4 h-4" />
            Get Quote
          </Button>
        </form>
      )}

      <button
        type="button"
        className="pdp-enquiry__download"
        aria-label={`Download brochure for ${productName}`}
      >
        <FileDown className="w-4 h-4" />
        Download Product Brochure (PDF)
      </button>
    </div>
  );
}
