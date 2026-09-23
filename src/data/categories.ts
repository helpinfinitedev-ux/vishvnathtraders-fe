// =============================================================================
// MOCK CATEGORY DATA
// Replace with API call: GET /api/categories
// =============================================================================

import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-1",
    slug: "plywood",
    name: "Plywood",
    description:
      "Engineered wood panels for structural and decorative applications. Available in MR, BWP, and Marine grades.",
    image: "/images/categories/plywood.jpg",
    productCount: 24,
  },
  {
    id: "cat-2",
    slug: "blockboard",
    name: "Blockboard",
    description:
      "Ideal for doors, furniture, and paneling. Superior flatness and screw-holding capacity.",
    image: "/images/categories/blockboard.jpg",
    productCount: 12,
  },
  {
    id: "cat-3",
    slug: "veneer",
    name: "Veneer",
    description:
      "Natural wood veneer sheets for premium furniture and interior design applications.",
    image: "/images/categories/veneer.jpg",
    productCount: 18,
  },
  {
    id: "cat-4",
    slug: "laminates",
    name: "Laminates",
    description:
      "High-pressure laminates (HPL) in hundreds of textures, patterns, and finishes.",
    image: "/images/categories/laminates.jpg",
    productCount: 48,
  },
  {
    id: "cat-5",
    slug: "flush-doors",
    name: "Flush Doors",
    description:
      "Solid and hollow-core flush doors for residential and commercial interiors.",
    image: "/images/categories/flush-doors.jpg",
    productCount: 10,
  },
  {
    id: "cat-6",
    slug: "mdf",
    name: "MDF & HDF",
    description:
      "Medium and high density fibreboard for cabinetry, mouldings, and precision millwork.",
    image: "/images/categories/mdf.jpg",
    productCount: 8,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
