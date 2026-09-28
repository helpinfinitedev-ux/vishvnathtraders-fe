// =============================================================================
// TrustBadges — ISI/FSC/Warranty/Delivery badges for product detail page
// =============================================================================

import { Award, Truck, CheckCircle2, ShieldCheck, TreePine } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Award, text: "ISI Certified", sub: "IS:303 / IS:710" },
  { icon: TreePine, text: "FSC Sourced", sub: "Sustainable Timber" },
  { icon: ShieldCheck, text: "Quality Guaranteed", sub: "Zero-Defect Policy" },
  { icon: Truck, text: "Pan-India Delivery", sub: "All 28 States" },
];

interface TrustBadgesProps {
  warranty?: string;
  className?: string;
}

export function TrustBadges({ warranty, className }: TrustBadgesProps) {
  const items = warranty
    ? [...TRUST_ITEMS, { icon: CheckCircle2, text: `${warranty} Warranty`, sub: "Manufacturing Defects" }]
    : TRUST_ITEMS;

  return (
    <div className={`pdp-trust ${className ?? ""}`}>
      {items.map(({ icon: Icon, text, sub }) => (
        <div key={text} className="pdp-trust__item">
          <div className="pdp-trust__icon">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="pdp-trust__title">{text}</p>
            <p className="pdp-trust__sub">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
