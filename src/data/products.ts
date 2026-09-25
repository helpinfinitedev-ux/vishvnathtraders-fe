// =============================================================================
// MOCK PRODUCT DATA
// Replace with API call: GET /api/products
// All prices are in INR
// =============================================================================

import type { Product } from "@/types";

export const products: Product[] = [
  // ── PLYWOOD ────────────────────────────────────────────────────────────────
  {
    id: "prod-1",
    slug: "woodcraft-bwp-marine-plywood-18mm",
    name: "WoodCraft BWP Marine Plywood",
    category: "plywood",
    // grade: "BWP Grade",
    thickness: ["6mm", "9mm", "12mm", "18mm", "25mm"],
    sizes: ["8×4 ft", "7×4 ft", "6×4 ft"],
    price: 4200,
    mrp: 4800,
    images: [
      "/images/products/plywood-bwp-1.jpg",
      "/images/products/plywood-bwp-2.jpg",
      "/images/products/plywood-bwp-3.jpg",
    ],
    shortDescription:
      "100% waterproof BWP-grade plywood, ideal for kitchens, bathrooms, and exterior applications.",
    description:
      "WoodCraft BWP Marine Plywood is manufactured using phenol formaldehyde resin under high temperature and pressure, making it completely waterproof. It carries ISI certification (IS:303) and is ideal for any application requiring resistance to moisture, humidity, and water immersion.",
    specifications: {
      "IS Standard": "IS:303",
      "Glue Type": "Phenol Formaldehyde (BWP)",
      "Core Material": "Hardwood Core",
      "Face/Back": "Gurjan Face",
      "Moisture Resistance": "Boiling Water Proof",
      "Termite Resistance": "Yes",
      Certification: "ISI Certified",
      "Density (g/cm³)": "0.70 – 0.75",
    },
    featured: true,
    inStock: true,
    tags: ["waterproof", "marine", "exterior", "ISI"],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-2",
    slug: "woodcraft-mr-grade-plywood-12mm",
    name: "WoodCraft MR Grade Plywood",
    category: "plywood",
    // grade: "MR Grade",
    thickness: ["6mm", "9mm", "12mm", "18mm"],
    sizes: ["8×4 ft", "7×4 ft"],
    price: 2800,
    mrp: 3200,
    images: [
      "/images/products/plywood-mr-1.jpg",
      "/images/products/plywood-mr-2.jpg",
    ],
    shortDescription:
      "Moisture-resistant plywood for furniture, interiors, and general construction.",
    description:
      "WoodCraft MR Grade Plywood uses urea formaldehyde resin and is moisture-resistant (not waterproof). It is the most commonly used plywood grade for indoor furniture, cabinetry, and general interior applications.",
    specifications: {
      "IS Standard": "IS:303",
      "Glue Type": "Urea Formaldehyde (MR)",
      "Core Material": "Hardwood Core",
      "Face/Back": "Eucalyptus Face",
      "Moisture Resistance": "Moisture Resistant",
      "Termite Resistance": "Optional",
      Certification: "ISI Certified",
      "Density (g/cm³)": "0.65 – 0.70",
    },
    featured: true,
    inStock: true,
    tags: ["furniture", "interior", "ISI", "economy"],
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "prod-3",
    slug: "woodcraft-fire-retardant-plywood",
    name: "WoodCraft Fire Retardant Plywood",
    category: "plywood",
    // grade: "FR Grade",
    thickness: ["9mm", "12mm", "18mm"],
    sizes: ["8×4 ft", "7×4 ft"],
    price: 5500,
    mrp: 6200,
    images: [
      "/images/products/plywood-fr-1.jpg",
      "/images/products/plywood-fr-2.jpg",
    ],
    shortDescription:
      "Fire retardant plywood for hospitality, commercial, and public spaces.",
    description:
      "Specially treated with fire-retardant chemicals, this plywood slows ignition and reduces flame spread. Ideal for hotels, hospitals, auditoriums, and public buildings where fire safety standards are mandatory.",
    specifications: {
      "IS Standard": "IS:5509",
      "Glue Type": "Phenol Formaldehyde (BWP)",
      "Core Material": "Hardwood Core",
      "Face/Back": "Gurjan Face",
      "Fire Rating": "Class 1 (BS 476 Part 7)",
      "Moisture Resistance": "Boiling Water Proof",
      Certification: "ISI Certified, CBRI Approved",
      "Density (g/cm³)": "0.72 – 0.78",
    },
    featured: false,
    inStock: true,
    tags: ["fire-retardant", "commercial", "safety"],
    createdAt: "2024-02-01T10:00:00Z",
  },
  // ── BLOCKBOARD ─────────────────────────────────────────────────────────────
  {
    id: "prod-4",
    slug: "woodcraft-blockboard-18mm",
    name: "WoodCraft Premium Blockboard",
    category: "blockboard",
    // grade: "BWP Grade",
    thickness: ["19mm", "25mm", "32mm"],
    sizes: ["8×4 ft", "7×4 ft"],
    price: 3600,
    mrp: 4100,
    images: [
      "/images/products/blockboard-1.jpg",
      "/images/products/blockboard-2.jpg",
    ],
    shortDescription:
      "Premium blockboard for doors, partitions, and heavy-duty furniture.",
    description:
      "WoodCraft Blockboard features solid timber strips sandwiched between hardwood veneers, offering superior flatness, strength, and screw-holding capacity. Ideal for making doors, shelves, and large furniture pieces.",
    specifications: {
      "IS Standard": "IS:1659",
      "Core Material": "Softwood Strips",
      "Face/Back": "Hardwood Veneer",
      "Glue Type": "Phenol Formaldehyde (BWP)",
      "Screw Holding": "Excellent",
      Flatness: "Superior",
      Certification: "ISI Certified",
      "Density (g/cm³)": "0.55 – 0.62",
    },
    featured: true,
    inStock: true,
    tags: ["doors", "furniture", "heavy-duty"],
    createdAt: "2024-02-10T10:00:00Z",
  },
  // ── VENEER ─────────────────────────────────────────────────────────────────
  {
    id: "prod-5",
    slug: "woodcraft-teak-veneer",
    name: "Natural Teak Wood Veneer",
    category: "veneer",
    // grade: "Premium",
    thickness: ["0.3mm", "0.5mm", "0.8mm"],
    sizes: ["8×4 ft", "Custom"],
    price: 1800,
    mrp: 2200,
    images: [
      "/images/products/veneer-teak-1.jpg",
      "/images/products/veneer-teak-2.jpg",
    ],
    shortDescription:
      "Natural teak veneer with rich grain patterns for premium furniture.",
    description:
      "Sourced from sustainably managed forests, our Natural Teak Veneer brings the warmth and richness of real wood to your interiors. Available in sliced and rotary-cut options, it is the perfect finishing touch for high-end furniture, cabinetry, and wall panels.",
    specifications: {
      "Wood Species": "Tectona Grandis (Teak)",
      "Cut Method": "Crown Cut / Quarter Cut",
      "Backing": "Paper Backed",
      "Surface": "Raw (unsanded / sanded)",
      "Finish": "Natural / Pre-finished",
      "Origin": "Myanmar Teak",
      "Sustainability": "SVLK Certified",
    },
    featured: true,
    inStock: true,
    tags: ["teak", "natural", "premium", "veneer"],
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "prod-6",
    slug: "woodcraft-walnut-veneer",
    name: "American Walnut Veneer",
    category: "veneer",
    // grade: "Premium",
    thickness: ["0.3mm", "0.5mm"],
    sizes: ["8×4 ft", "Custom"],
    price: 2400,
    mrp: 2900,
    images: [
      "/images/products/veneer-walnut-1.jpg",
      "/images/products/veneer-walnut-2.jpg",
    ],
    shortDescription: "American walnut veneer for contemporary luxury interiors.",
    description:
      "American Walnut Veneer offers a distinctive dark chocolate-brown grain that exudes sophistication. Ideal for contemporary and transitional design styles, it is widely used in high-end residential furniture, hotel lobbies, and executive office interiors.",
    specifications: {
      "Wood Species": "Juglans Nigra (American Black Walnut)",
      "Cut Method": "Crown Cut",
      "Backing": "Paper Backed",
      "Surface": "Sanded",
      "Finish": "Natural",
      "Origin": "USA",
      "Sustainability": "FSC Certified",
    },
    featured: false,
    inStock: true,
    tags: ["walnut", "american", "luxury", "veneer"],
    createdAt: "2024-03-01T10:00:00Z",
  },
  // ── LAMINATES ──────────────────────────────────────────────────────────────
  // {
  //   id: "prod-7",
  //   slug: "woodcraft-hpl-laminate-1mm",
  //   name: "WoodCraft High-Pressure Laminate (HPL)",
  //   category: "laminates",
  //   grade: "Premium HPL",
  //   thickness: ["0.7mm", "1.0mm", "1.5mm"],
  //   sizes: ["8×4 ft", "10×4 ft"],
  //   price: 980,
  //   mrp: 1200,
  //   images: [
  //     "/images/products/laminate-hpl-1.jpg",
  //     "/images/products/laminate-hpl-2.jpg",
  //   ],
  //   shortDescription:
  //     "High-pressure laminates in 300+ designs for furniture and interior surfaces.",
  //   description:
  //     "Our High-Pressure Laminates are manufactured under extreme heat and pressure for superior durability. With a scratch-resistant surface, they are ideal for kitchen cabinets, wardrobes, office furniture, and commercial countertops. Available in 300+ designs including wood, solid, stone, and metallic finishes.",
  //   specifications: {
  //     "IS Standard": "IS:2046",
  //     "Standard": "EN 438",
  //     "Surface Finish": "Matte / Gloss / Texture",
  //     "Scratch Resistance": "Class 5 (EN 438-2 Clause 14)",
  //     "Impact Resistance": "Class 3 (EN 438-2 Clause 20)",
  //     "Moisture Resistance": "Excellent",
  //     "Available Designs": "300+",
  //     Certification: "ISI Certified",
  //   },
  //   featured: true,
  //   inStock: true,
  //   tags: ["HPL", "laminate", "kitchen", "furniture"],
  //   createdAt: "2024-03-10T10:00:00Z",
  // },
  // ── FLUSH DOORS ────────────────────────────────────────────────────────────
  {
    id: "prod-8",
    slug: "woodcraft-flush-door-solid-core",
    name: "WoodCraft Solid Core Flush Door",
    category: "flush-doors",
    // grade: "Premium",
    thickness: ["32mm", "35mm", "40mm"],
    sizes: ["7×3 ft", "7×2.5 ft", "6.6×2.5 ft"],
    price: 2200,
    mrp: 2800,
    images: [
      "/images/products/door-solid-1.jpg",
      "/images/products/door-solid-2.jpg",
    ],
    shortDescription:
      "Solid core flush doors for sound insulation and impact resistance.",
    description:
      "WoodCraft Solid Core Flush Doors are built with a dense timber or particle board core for maximum sound insulation and impact resistance. They are available pre-finished or ready for veneer/laminate facing.",
    specifications: {
      "IS Standard": "IS:2202 (Part 1)",
      "Core Material": "Solid Timber / Particle Board",
      "Face/Back": "Hardwood Veneer",
      "Lipping": "Hardwood Lipping on all 4 sides",
      "Sound Reduction": "28 dB",
      "Moisture Resistance": "BWP Grade",
      Certification: "ISI Certified",
    },
    featured: false,
    inStock: true,
    tags: ["door", "solid-core", "sound-proof"],
    createdAt: "2024-03-20T10:00:00Z",
  },
  // ── MDF ────────────────────────────────────────────────────────────────────
  {
    id: "prod-9",
    slug: "woodcraft-moisture-resistant-mdf",
    name: "WoodCraft Moisture Resistant MDF",
    category: "mdf",
    // grade: "MR Grade",
    thickness: ["6mm", "9mm", "12mm", "18mm", "25mm"],
    sizes: ["8×4 ft", "8×6 ft"],
    price: 1400,
    mrp: 1700,
    images: [
      "/images/products/mdf-mr-1.jpg",
      "/images/products/mdf-mr-2.jpg",
    ],
    shortDescription:
      "Moisture-resistant MDF for kitchen cabinets and bathroom furniture.",
    description:
      "WoodCraft Moisture Resistant MDF is manufactured with a water-repellent resin system that significantly reduces water absorption. It is the preferred choice for modular kitchens, bathroom vanities, and areas with moderate humidity.",
    specifications: {
      "IS Standard": "IS:12406",
      "EN Standard": "EN 622-5 (MDF.H)",
      "Density": "740–780 kg/m³",
      "Internal Bond": "≥ 0.65 N/mm²",
      "Bending Strength": "≥ 30 N/mm²",
      "Moisture Resistance": "Class 3 (Wet Conditions)",
      "Edge Quality": "Smooth, Paintable",
      Certification: "ISI Certified",
    },
    featured: false,
    inStock: true,
    tags: ["MDF", "moisture-resistant", "modular", "kitchen"],
    createdAt: "2024-04-01T10:00:00Z",
  },
  {
    id: "prod-10",
    slug: "woodcraft-bwp-plywood-9mm",
    name: "WoodCraft BWP Plywood (Economy)",
    category: "plywood",
    // grade: "BWP Grade",
    thickness: ["6mm", "9mm", "12mm"],
    sizes: ["8×4 ft", "7×4 ft"],
    price: 3200,
    mrp: 3800,
    images: [
      "/images/products/plywood-bwp-eco-1.jpg",
      "/images/products/plywood-bwp-eco-2.jpg",
    ],
    shortDescription:
      "BWP-grade economy plywood — waterproof performance at an accessible price.",
    description:
      "An economical alternative that doesn't compromise on the essential BWP waterproof rating. Suitable for modular kitchens, exterior doors, and wet-area cladding where budget is a consideration but moisture resistance is non-negotiable.",
    specifications: {
      "IS Standard": "IS:303",
      "Glue Type": "Phenol Formaldehyde (BWP)",
      "Core Material": "Poplar / Eucalyptus Core",
      "Face/Back": "Eucalyptus Face",
      "Moisture Resistance": "Boiling Water Proof",
      "Termite Resistance": "Yes",
      Certification: "ISI Certified",
      "Density (g/cm³)": "0.68 – 0.72",
    },
    featured: true,
    inStock: true,
    tags: ["waterproof", "BWP", "economy", "value"],
    createdAt: "2024-04-10T10:00:00Z",
  },
  {
    id: "prod-11",
    slug: "woodcraft-calibrated-mdf",
    name: "WoodCraft Calibrated MDF (Standard)",
    category: "mdf",
    // grade: "Standard",
    thickness: ["3mm", "6mm", "9mm", "12mm", "18mm"],
    sizes: ["8×4 ft", "8×6 ft"],
    price: 1100,
    mrp: 1400,
    images: [
      "/images/products/mdf-std-1.jpg",
      "/images/products/mdf-std-2.jpg",
    ],
    shortDescription:
      "Precision-calibrated standard MDF for routing, mouldings, and interior millwork.",
    description:
      "Our Standard Calibrated MDF is uniform in density and thickness throughout the panel, making it ideal for CNC routing, shaped mouldings, skirting boards, and general interior millwork where a smooth, paintable surface is required.",
    specifications: {
      "IS Standard": "IS:12406",
      "Density": "720–760 kg/m³",
      "Internal Bond": "≥ 0.55 N/mm²",
      "Bending Strength": "≥ 26 N/mm²",
      "Surface": "Calibrated, Sanded smooth",
      "Edge Quality": "Excellent for routing",
      Certification: "ISI Certified",
    },
    featured: false,
    inStock: true,
    tags: ["MDF", "routing", "moulding", "CNC"],
    createdAt: "2024-04-15T10:00:00Z",
  },
  {
    id: "prod-12",
    slug: "woodcraft-laminate-matte-woodgrain",
    name: "WoodCraft Matte Wood Grain Laminate",
    category: "laminates",
    // grade: "Premium HPL",
    thickness: ["1.0mm", "1.5mm"],
    sizes: ["8×4 ft"],
    price: 1100,
    mrp: 1350,
    images: [
      "/images/products/laminate-wood-1.jpg",
      "/images/products/laminate-wood-2.jpg",
    ],
    shortDescription:
      "Realistic matte wood grain laminates for a natural aesthetic.",
    description:
      "Achieve the look of real wood without the maintenance. Our Matte Wood Grain HPL collection features texture-synchronised embossing that closely replicates the pore structure of natural wood. Available in 40+ wood species aesthetics.",
    specifications: {
      "IS Standard": "IS:2046",
      "Standard": "EN 438",
      "Surface Finish": "Matte Woodgrain",
      "Texture Sync": "Yes — pore synchronised",
      "Scratch Resistance": "Class 5",
      "Available Species": "40+ (Teak, Oak, Walnut, Wenge, etc.)",
      Certification: "ISI Certified",
    },
    featured: true,
    inStock: true,
    tags: ["laminate", "wood-grain", "matte", "furniture"],
    createdAt: "2024-04-20T10:00:00Z",
  },
];

// ── UTILITY FUNCTIONS ─────────────────────────────────────────────────────────
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

// export function getAllGrades(): string[] {
//   return [...new Set(products.map((p) => p.grade))];
// }

export function getAllThicknesses(): string[] {
  return [...new Set(products.flatMap((p) => p.thickness))].sort();
}

export const PRICE_RANGE: [number, number] = [
  Math.min(...products.map((p) => p.price)),
  Math.max(...products.map((p) => p.price)),
];
