import type { CatalogueProduct } from "@/types";

export const catalogueProducts: CatalogueProduct[] = [
  // ==========================================
  // 1. DOORS
  // ==========================================
  {
    id: "door-flush",
    slug: "flush-door",
    name: "Flush Door",
    category: "doors",
    subcategory: "Flush Door",
    images: ["/images/products/placeholder-wood.svg"],
    description: "Premium flush doors suitable for both interior and exterior applications.",
  },
  {
    id: "door-decorative",
    slug: "decorative-door",
    name: "Decorative Door",
    category: "doors",
    subcategory: "Decorative Door",
    images: ["/images/products/placeholder-wood.svg"],
    description: "Aesthetically pleasing decorative doors to enhance your home's interior.",
  },
  {
    id: "door-moulded",
    slug: "moulded-door",
    name: "Moulded Doors",
    category: "doors",
    subcategory: "Moulded Doors",
    images: ["/images/products/placeholder-wood.svg"],
    description: "Durable and elegantly designed moulded doors.",
  },

  // ==========================================
  // 2. LOUVERS
  // ==========================================
  {
    id: "louver-wpc-5",
    slug: "wpc-louver-5",
    name: 'WPC Louver 5"',
    category: "louvers",
    type: "WPC",
    sizes: ['5"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "High-quality WPC louver for wall cladding and ceiling.",
  },
  {
    id: "louver-wpc-6",
    slug: "wpc-louver-6",
    name: 'WPC Louver 6"',
    category: "louvers",
    type: "WPC",
    sizes: ['6"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "High-quality WPC louver for wall cladding and ceiling.",
  },
  {
    id: "louver-wpc-8",
    slug: "wpc-louver-8",
    name: 'WPC Louver 8"',
    category: "louvers",
    type: "WPC",
    sizes: ['8"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "High-quality WPC louver for wall cladding and ceiling.",
  },
  {
    id: "louver-wpc-10",
    slug: "wpc-louver-10",
    name: 'WPC Louver 10"',
    category: "louvers",
    type: "WPC",
    sizes: ['10"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "High-quality WPC louver for wall cladding and ceiling.",
  },
  {
    id: "louver-wpc-12",
    slug: "wpc-louver-12",
    name: 'WPC Louver 12"',
    category: "louvers",
    type: "WPC",
    sizes: ['12"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "High-quality WPC louver for wall cladding and ceiling.",
  },
  {
    id: "louver-pvc-5",
    slug: "pvc-louver-5",
    name: 'PVC Louver 5"',
    category: "louvers",
    type: "PVC",
    sizes: ['5"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Durable PVC louver for interior decoration.",
  },
  {
    id: "louver-pvc-6",
    slug: "pvc-louver-6",
    name: 'PVC Louver 6"',
    category: "louvers",
    type: "PVC",
    sizes: ['6"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Durable PVC louver for interior decoration.",
  },
  {
    id: "louver-pvc-8",
    slug: "pvc-louver-8",
    name: 'PVC Louver 8"',
    category: "louvers",
    type: "PVC",
    sizes: ['8"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Durable PVC louver for interior decoration.",
  },
  {
    id: "louver-pvc-10",
    slug: "pvc-louver-10",
    name: 'PVC Louver 10"',
    category: "louvers",
    type: "PVC",
    sizes: ['10"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Durable PVC louver for interior decoration.",
  },
  {
    id: "louver-pvc-12",
    slug: "pvc-louver-12",
    name: 'PVC Louver 12"',
    category: "louvers",
    type: "PVC",
    sizes: ['12"'],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Durable PVC louver for interior decoration.",
  },

  // ==========================================
  // 3. CHARCOAL SHEETS
  // ==========================================
  {
    id: "charcoal-8x2",
    slug: "charcoal-sheet-8x2",
    name: "Charcoal Sheet 8x2 ft",
    category: "charcoal-sheets",
    sizes: ["8x2 ft"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Premium charcoal sheets for striking wall accents.",
  },
  {
    id: "charcoal-8x4",
    slug: "charcoal-sheet-8x4",
    name: "Charcoal Sheet 8x4 ft",
    category: "charcoal-sheets",
    sizes: ["8x4 ft"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Premium charcoal sheets for striking wall accents.",
  },

  // ==========================================
  // 4. U.V. SHEETS
  // ==========================================
  {
    id: "uv-sheet-standard",
    slug: "uv-sheet",
    name: "U.V. Sheet",
    category: "uv-sheets",
    images: ["/images/products/placeholder-wood.svg"],
    description: "High-gloss U.V. coated sheets for premium cabinetry and panelling.",
  },

  // ==========================================
  // 5. PLYWOOD
  // ==========================================
  {
    id: "plywood-century-sainik710",
    slug: "century-sainik-710",
    name: "Century Sainik 710",
    category: "plywood",
    brand: "Century",
    productLine: "Sainik 710",
    thickness: ["6mm", "8mm", "12mm", "18mm", "25mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "BWP Grade plywood from Century.",
  },
  {
    id: "plywood-century-clubprime",
    slug: "century-club-prime",
    name: "Century Club Prime",
    category: "plywood",
    brand: "Century",
    productLine: "Club Prime",
    thickness: ["6mm", "8mm", "12mm", "18mm", "25mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Premium boiling waterproof plywood from Century.",
  },
  {
    id: "plywood-advance",
    slug: "advance-plywood",
    name: "Advance Plywood",
    category: "plywood",
    brand: "Advance",
    thickness: ["6mm", "8mm", "12mm", "18mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "High-quality plywood from Advance.",
  },
  {
    id: "plywood-ktm",
    slug: "ktm-plywood",
    name: "KTM Plywood",
    category: "plywood",
    brand: "KTM",
    thickness: ["6mm", "8mm", "12mm", "18mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Durable plywood from KTM.",
  },
  {
    id: "plywood-rajdhani",
    slug: "rajdhani-plywood",
    name: "Rajdhani Plywood",
    category: "plywood",
    brand: "Rajdhani",
    thickness: ["6mm", "8mm", "12mm", "18mm", "25mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Reliable plywood from Rajdhani.",
  },

  // ==========================================
  // 6. LAMINATES
  // ==========================================
  {
    id: "lam-century-1mm",
    slug: "century-laminate-1mm",
    name: "Century Laminate",
    category: "laminates",
    brand: "Century",
    subcategory: "1mm",
    thickness: ["1mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Premium 1mm laminates from Century.",
  },
  {
    id: "lam-advance-1mm",
    slug: "advance-laminate-1mm",
    name: "Advance Laminate",
    category: "laminates",
    brand: "Advance",
    subcategory: "1mm",
    thickness: ["1mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Premium 1mm laminates from Advance.",
  },
  {
    id: "lam-advance-08mm",
    slug: "advance-laminate-08mm",
    name: "Advance Laminate",
    category: "laminates",
    brand: "Advance",
    subcategory: "0.8mm",
    thickness: ["0.8mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "0.8mm laminates from Advance.",
  },
  {
    id: "lam-deviya-1mm",
    slug: "deviya-laminate-1mm",
    name: "Deviya Laminate",
    category: "laminates",
    brand: "Deviya",
    subcategory: "1mm",
    thickness: ["1mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Premium 1mm laminates from Deviya.",
  },
  {
    id: "lam-deviya-08mm",
    slug: "deviya-laminate-08mm",
    name: "Deviya Laminate",
    category: "laminates",
    brand: "Deviya",
    subcategory: "0.8mm",
    thickness: ["0.8mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "0.8mm laminates from Deviya.",
  },
  {
    id: "lam-greenlam-1mm",
    slug: "greenlam-laminate-1mm",
    name: "Greenlam Laminate",
    category: "laminates",
    brand: "Greenlam",
    subcategory: "1mm",
    thickness: ["1mm"],
    images: ["/images/products/placeholder-wood.svg"],
    description: "Premium 1mm laminates from Greenlam.",
  },
  {
    id: "lam-kridha-liner",
    slug: "kridha-liner-laminate",
    name: "Kridha Liner",
    category: "laminates",
    brand: "Kridha",
    subcategory: "Liner",
    images: ["/images/products/placeholder-wood.svg"],
    description: "Liner laminates from Kridha.",
  },
];

export function getCatalogueProductsByCategory(category: string): CatalogueProduct[] {
  return catalogueProducts.filter((p) => p.category === category);
}

export function getCatalogueProductBySlug(slug: string): CatalogueProduct | undefined {
  return catalogueProducts.find((p) => p.slug === slug);
}
