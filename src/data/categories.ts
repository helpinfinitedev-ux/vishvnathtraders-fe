import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-1",
    slug: "doors",
    name: "Doors",
    description: "Premium flush, decorative, and moulded doors for all your interior and exterior needs.",
    image: "/images/categories/flush-doors.jpg", // Reusing existing image path
    productCount: 3,
    subcategories: ["Flush Door", "Decorative Door", "Moulded Doors"]
  },
  {
    id: "cat-2",
    slug: "louvers",
    name: "Louvers",
    description: "Stylish WPC and PVC louvers available in various sizes.",
    image: "/images/categories/mdf.jpg",
    productCount: 10,
  },
  {
    id: "cat-3",
    slug: "charcoal-sheets",
    name: "Charcoal Sheets",
    description: "High-quality charcoal sheets for wall paneling and interior decoration.",
    image: "/images/categories/veneer.jpg",
    productCount: 2,
  },
  {
    id: "cat-4",
    slug: "uv-sheets",
    name: "U.V. Sheets",
    description: "Glossy and durable U.V. coated sheets for a modern finish.",
    image: "/images/categories/laminates.jpg",
    productCount: 1,
  },
  {
    id: "cat-5",
    slug: "plywood",
    name: "Plywood",
    description: "Top brands of plywood including Century, Advance, KTM, and Rajdhani.",
    image: "/images/categories/plywood.jpg",
    productCount: 8,
  },
  {
    id: "cat-6",
    slug: "laminates",
    name: "Laminates",
    description: "Premium laminates from Century, Advance, Deviya, Greenlam, and Kridha.",
    image: "/images/categories/laminates.jpg",
    productCount: 5,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
