// =============================================================================
// MOCK TESTIMONIAL DATA
// Replace with API call: GET /api/testimonials
// =============================================================================

import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Rajesh Kumar",
    role: "Senior Interior Designer",
    company: "Archaus Design Studio, Mumbai",
    message:
      "WoodCraft's BWP plywood is consistently flat and void-free. We've switched our entire luxury residential portfolio to their panels — the quality is simply unmatched in this price bracket.",
    rating: 5,
    avatar: "/images/testimonials/avatar-1.jpg",
  },
  {
    id: "test-2",
    name: "Priya Menon",
    role: "Founder & Principal Architect",
    company: "Studio Pragma, Bengaluru",
    message:
      "The teak veneer range is exquisite. Consistent grain matching across sheets made our hotel lobby feature wall a showstopper. WoodCraft understands what designers actually need.",
    rating: 5,
    avatar: "/images/testimonials/avatar-2.jpg",
  },
  {
    id: "test-3",
    name: "Anil Sharma",
    role: "Owner",
    company: "Sharma Furniture Works, Delhi",
    message:
      "As a furniture manufacturer, I need reliability above all else. WoodCraft delivers the same quality batch after batch. Their MR plywood machines beautifully with zero delamination.",
    rating: 5,
    avatar: "/images/testimonials/avatar-3.jpg",
  },
  {
    id: "test-4",
    name: "Kavitha Subramanian",
    role: "Procurement Manager",
    company: "Prestige Constructions, Chennai",
    message:
      "Pan-India logistics on schedule, ISI-certified quality, and a responsive account team. WoodCraft has been our go-to plywood vendor for three large commercial projects.",
    rating: 4,
    avatar: "/images/testimonials/avatar-4.jpg",
  },
  {
    id: "test-5",
    name: "Mohammed Farouk",
    role: "Modular Kitchen Dealer",
    company: "Premier Interiors, Hyderabad",
    message:
      "The moisture-resistant MDF range is a game changer for modular kitchens. Clients love the smooth edges and the finish that laminates bond to. No warping even after 2 years.",
    rating: 5,
    avatar: "/images/testimonials/avatar-5.jpg",
  },
  {
    id: "test-6",
    name: "Deepak Nair",
    role: "Architect",
    company: "Nair & Associates, Kochi",
    message:
      "Switched to WoodCraft after a recommendation from a colleague. The difference in quality is night and day. Their HPL laminates have an incredible depth of finish that clients notice.",
    rating: 5,
    avatar: "/images/testimonials/avatar-6.jpg",
  },
];
