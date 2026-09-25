// =============================================================================
// GLOBAL TYPE DEFINITIONS
// All TypeScript interfaces for the data layer — backend-ready shape
// =============================================================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string; // matches Category.slug
  // grade: string; // e.g. "MR Grade", "BWP Grade", "Marine"
  thickness: string[]; // e.g. ["6mm", "9mm", "12mm", "18mm"]
  sizes: string[]; // e.g. ["8x4 ft", "7x4 ft"]
  price: number; // base price (INR)
  mrp: number; // MRP for showing discount
  images: string[]; // ordered list — first is primary
  description: string;
  shortDescription: string;
  specifications: Record<string, string>; // key-value spec table
  featured: boolean;
  inStock: boolean;
  tags: string[];
  createdAt: string; // ISO date
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or markdown string
  category: string; // blog category label
  author: string;
  authorRole: string;
  date: string; // ISO date
  coverImage: string;
  readTime: number; // minutes
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. "Interior Designer, Mumbai"
  company: string;
  message: string;
  rating: number; // 1-5
  avatar: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  icon: string; // image path or emoji fallback
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[]; // for dropdown menus
}

// Form types
export interface EnquiryFormData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  enquiryType: "distributor" | "dealer" | "bulk-order" | "other";
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Filter & sort types for shop page
export interface ProductFilters {
  categories: string[];
  grades: string[];
  thicknesses: string[];
  priceRange: [number, number];
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "name-asc";
