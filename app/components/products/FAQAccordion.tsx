"use client";

// =============================================================================
// FAQAccordion — expandable FAQ section for product detail page
// =============================================================================

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductFAQ } from "@/types";

interface FAQAccordionProps {
  faqs: ProductFAQ[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <div className={cn("pdp-faq", className)}>
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={cn("pdp-faq__item", isOpen && "pdp-faq__item--open")}>
            <button
              type="button"
              className="pdp-faq__trigger"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="pdp-faq__question">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "pdp-faq__chevron",
                  isOpen && "pdp-faq__chevron--open"
                )}
              />
            </button>
            <div
              id={`faq-answer-${i}`}
              className={cn("pdp-faq__answer", isOpen && "pdp-faq__answer--open")}
              role="region"
              aria-labelledby={`faq-question-${i}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
