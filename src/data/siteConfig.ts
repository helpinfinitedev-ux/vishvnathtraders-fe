// =============================================================================
// SITE CONFIGURATION — sitewide constants, nav links, contact details
// Easy to migrate to env vars / CMS later
// =============================================================================

import type { NavLink, Certification } from "@/types";

export const SITE_CONFIG = {
  name: "WoodCraft Premium",
  tagline: "Engineered for Excellence. Built to Last.",
  description:
    "WoodCraft Premium is India's trusted manufacturer of ISI-certified plywood, blockboard, veneer, laminates, and flush doors — supplying architects, interior designers, builders, and distributors across the country.",
  url: "https://woodcraftpremium.com",
  email: "info@woodcraftpremium.com",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  address: {
    line1: "WoodCraft Premium Industries Ltd.",
    line2: "Plot No. 42, Industrial Area Phase II",
    city: "Yamuna Nagar",
    state: "Haryana",
    pin: "135001",
    country: "India",
  },
  social: {
    instagram: "https://instagram.com/woodcraftpremium",
    facebook: "https://facebook.com/woodcraftpremium",
    linkedin: "https://linkedin.com/company/woodcraftpremium",
    youtube: "https://youtube.com/@woodcraftpremium",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.5...placeholder",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Plywood", href: "/products?category=plywood" },
      { label: "Blockboard", href: "/products?category=blockboard" },
      { label: "Veneer", href: "/products?category=veneer" },
      { label: "Laminates", href: "/products?category=laminates" },
      { label: "Flush Doors", href: "/products?category=flush-doors" },
      { label: "MDF & HDF", href: "/products?category=mdf" },
    ],
  },
  { label: "Blogs", href: "/blogs" },
  { label: "Distributor", href: "/distributor" },
  { label: "Contact", href: "/contact" },
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "ISI Mark (IS:303)",
    issuer: "Bureau of Indian Standards (BIS)",
    year: "2008",
    icon: "/images/certifications/isi.png",
    description:
      "ISI certification for plywood under IS:303 — the primary quality mark for plywood sold in India.",
  },
  {
    id: "cert-2",
    name: "FSC Chain of Custody",
    issuer: "Forest Stewardship Council",
    year: "2018",
    icon: "/images/certifications/fsc.png",
    description:
      "FSC CoC certification ensuring our raw materials are sourced from responsibly managed forests.",
  },
  {
    id: "cert-3",
    name: "ISO 9001:2015",
    issuer: "International Organization for Standardization",
    year: "2015",
    icon: "/images/certifications/iso9001.png",
    description:
      "Quality Management System certification covering all our manufacturing and supply chain operations.",
  },
  {
    id: "cert-4",
    name: "ISO 14001:2015",
    issuer: "International Organization for Standardization",
    year: "2019",
    icon: "/images/certifications/iso14001.png",
    description:
      "Environmental Management System certification — our commitment to reducing environmental impact.",
  },
];

export const USP_ITEMS = [
  {
    id: "usp-1",
    icon: "Shield",
    title: "ISI Certified Quality",
    description:
      "Every panel we manufacture is ISI-certified and batch-tested to meet or exceed Bureau of Indian Standards specifications.",
  },
  {
    id: "usp-2",
    icon: "Factory",
    title: "30+ Years of Manufacturing",
    description:
      "Three decades of expertise in engineered wood products, with a state-of-the-art plant and in-house quality labs.",
  },
  {
    id: "usp-3",
    icon: "Truck",
    title: "Pan-India Delivery",
    description:
      "Our dedicated logistics network ensures timely delivery to your site across all 28 states, within committed lead times.",
  },
  {
    id: "usp-4",
    icon: "Ruler",
    title: "Custom Sizes & Grades",
    description:
      "Need a non-standard thickness or custom dimension? Our plant can accommodate bespoke orders with minimum MOQ.",
  },
  {
    id: "usp-5",
    icon: "Leaf",
    title: "Sustainably Sourced",
    description:
      "FSC-certified raw materials and responsible forestry practices — our products support LEED green building credits.",
  },
  {
    id: "usp-6",
    icon: "HeadphonesIcon",
    title: "Dedicated Account Support",
    description:
      "A dedicated relationship manager and technical support team for every distributor, architect, and bulk buyer.",
  },
];
