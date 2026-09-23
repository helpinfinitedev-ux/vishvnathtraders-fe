// =============================================================================
// MOCK BLOG DATA
// Replace with API call: GET /api/blogs
// =============================================================================

import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "bwp-vs-mr-grade-plywood-which-is-right-for-you",
    title: "BWP vs MR Grade Plywood: Which Is Right for Your Project?",
    excerpt:
      "Understanding the difference between BWP and MR grade plywood can save you thousands on your next project while ensuring the right performance for each application.",
    category: "Buying Guide",
    author: "WoodCraft Editorial Team",
    authorRole: "Technical Content Team",
    date: "2024-05-10T10:00:00Z",
    coverImage: "/images/blogs/blog-bwp-vs-mr.jpg",
    readTime: 6,
    tags: ["BWP", "MR Grade", "Buying Guide", "Plywood"],
    content: `
      <h2>The Core Difference</h2>
      <p>Plywood grades are primarily defined by the type of adhesive resin used to bond the veneers together. This single factor determines how the panel performs in the presence of moisture.</p>
      <h3>MR Grade (Moisture Resistant)</h3>
      <p>MR Grade plywood uses Urea Formaldehyde (UF) resin. It can withstand occasional moisture exposure but will delaminate when submerged in water or subjected to sustained humidity. It is the most economical choice for indoor furniture, wardrobes, and general interior joinery in dry areas.</p>
      <h3>BWP Grade (Boiling Water Proof)</h3>
      <p>BWP Grade plywood uses Phenol Formaldehyde (PF) resin under high temperature and pressure. It can withstand boiling water immersion for 72+ hours without delamination — making it genuinely waterproof. It is mandatory for kitchens, bathrooms, exterior cladding, and any application where moisture contact is possible.</p>
      <h2>When to Choose MR Grade</h2>
      <ul>
        <li>Bedroom wardrobes and study furniture</li>
        <li>Living room TV units and bookshelves</li>
        <li>Office partitions (dry areas)</li>
        <li>Budget-conscious interior furniture</li>
      </ul>
      <h2>When to Choose BWP Grade</h2>
      <ul>
        <li>Modular kitchen cabinets and shutters</li>
        <li>Bathroom vanities and medicine cabinets</li>
        <li>Exterior doors and window frames</li>
        <li>Utility areas, laundry rooms, garages</li>
        <li>Rooftop and terrace structures</li>
      </ul>
      <h2>Price Difference</h2>
      <p>BWP grade typically costs 30–50% more than equivalent MR grade plywood. However, using MR grade in wet areas is a false economy — replacement costs and water damage far outweigh the initial savings.</p>
      <blockquote>Pro Tip: Use BWP for the carcase (structure) of kitchen cabinets and MR grade for the interior shelves where direct moisture contact is unlikely. This hybrid approach optimises cost without compromising durability.</blockquote>
    `,
  },
  {
    id: "blog-2",
    slug: "how-to-choose-veneer-for-luxury-furniture",
    title: "How to Choose the Right Veneer for Luxury Furniture",
    excerpt:
      "Natural wood veneer transforms ordinary furniture into heirloom pieces. Here's what interior designers and furniture makers need to know about selecting, matching, and specifying veneer.",
    category: "Design Guide",
    author: "Riya Kapoor",
    authorRole: "Senior Interior Design Consultant",
    date: "2024-05-22T10:00:00Z",
    coverImage: "/images/blogs/blog-veneer-guide.jpg",
    readTime: 8,
    tags: ["Veneer", "Luxury Furniture", "Interior Design", "Wood Species"],
    content: `
      <h2>Why Natural Veneer Matters</h2>
      <p>In an age of digital printing and synthetic finishes, natural wood veneer remains irreplaceable for discerning clients. Each sheet is unique — the grain, figure, and colour are products of decades of natural growth that no printer can replicate.</p>
      <h2>Understanding Cut Methods</h2>
      <h3>Crown Cut (Plain Sliced)</h3>
      <p>The log is halved and sliced parallel to the centre. This produces the characteristic cathedral arch grain pattern — the most commonly used aesthetic in furniture.</p>
      <h3>Quarter Cut</h3>
      <p>The log is quartered and each quarter is sliced perpendicular to the growth rings. This produces straight, consistent grain lines — preferred for contemporary and minimalist interiors.</p>
      <h3>Rotary Cut</h3>
      <p>The log is spun against a blade, producing wide, bold grain patterns. Most economical and widely used for backing veneers and plywood faces.</p>
      <h2>Popular Species and Their Applications</h2>
      <ul>
        <li><strong>Teak:</strong> Warm golden-brown; timeless classic; ideal for traditional and transitional interiors</li>
        <li><strong>American Walnut:</strong> Rich chocolate-brown; contemporary luxury; hotel lobbies, executive offices</li>
        <li><strong>Oak:</strong> Versatile honey-blonde; Scandinavian and industrial design styles</li>
        <li><strong>Wenge:</strong> Dark espresso with fine streaks; dramatic, modern aesthetic</li>
        <li><strong>Maple:</strong> Pale, tight grain; clean Japandi and minimalist designs</li>
      </ul>
    `,
  },
  {
    id: "blog-3",
    slug: "isi-certification-why-it-matters-for-plywood",
    title: "ISI Certification: Why It's Non-Negotiable When Buying Plywood",
    excerpt:
      "The ISI mark on plywood is not just a sticker — it guarantees your product has been tested to Indian standards for strength, moisture resistance, and formaldehyde emission. Here's what it means.",
    category: "Quality & Standards",
    author: "WoodCraft Editorial Team",
    authorRole: "Technical Content Team",
    date: "2024-06-05T10:00:00Z",
    coverImage: "/images/blogs/blog-isi-certification.jpg",
    readTime: 5,
    tags: ["ISI Certification", "Quality", "Standards", "IS:303"],
    content: `
      <h2>What is ISI Certification?</h2>
      <p>ISI stands for Indian Standards Institute — now the Bureau of Indian Standards (BIS). The ISI mark (IS:303 for plywood) certifies that a product has been independently tested and conforms to the specified Indian Standard.</p>
      <h2>What ISI Certification Tests</h2>
      <ul>
        <li><strong>Glue Bond Strength:</strong> Tensile shear strength of the adhesive joint</li>
        <li><strong>Moisture Resistance:</strong> Cyclic boiling water test for BWP; cold water soak for MR</li>
        <li><strong>Formaldehyde Emission:</strong> E1 level (≤1.5 mg/L) mandatory for indoor use</li>
        <li><strong>Bending Strength:</strong> Modulus of rupture and modulus of elasticity</li>
        <li><strong>Face and Core Quality:</strong> Void percentage, delamination, core gap limits</li>
      </ul>
      <h2>How to Verify an ISI Mark</h2>
      <p>Every ISI-certified panel must have: the ISI mark logo, the IS number (e.g., IS:303), the manufacturer's licence number, and the batch/date of manufacture. You can verify any licence number on the BIS website at bis.gov.in.</p>
      <blockquote>Warning: The market is flooded with uncertified plywood carrying fake ISI stamps. Always buy from authorised dealers and ask for the mill's BIS licence number.</blockquote>
    `,
  },
  {
    id: "blog-4",
    slug: "laminates-vs-veneer-which-finish-is-better",
    title: "Laminates vs Veneer: Choosing the Right Surface Finish",
    excerpt:
      "Both laminates and veneer transform the look of furniture — but they serve different purposes, budgets, and design goals. Here's a definitive comparison.",
    category: "Design Guide",
    author: "Meera Nair",
    authorRole: "Product Specialist, WoodCraft",
    date: "2024-06-18T10:00:00Z",
    coverImage: "/images/blogs/blog-laminates-vs-veneer.jpg",
    readTime: 7,
    tags: ["Laminate", "Veneer", "Surface Finish", "Furniture"],
    content: `
      <h2>Laminate: The Practical Workhorse</h2>
      <p>High-pressure laminate (HPL) is a man-made product consisting of multiple layers of kraft paper saturated with melamine resin, topped with a decorative layer, and bonded under extreme heat and pressure (>1000 psi).</p>
      <h3>Advantages of Laminate</h3>
      <ul>
        <li>Extremely durable: scratch, stain, and heat resistant</li>
        <li>Consistent appearance across all sheets</li>
        <li>Wide range of designs (solid, wood grain, stone, metallic)</li>
        <li>Low maintenance — wipe clean</li>
        <li>More affordable than real veneer</li>
      </ul>
      <h2>Veneer: The Authentic Luxury</h2>
      <p>Natural wood veneer is real wood — sliced from a log into thin sheets (0.3–0.8mm) and bonded to a substrate. No two sheets are identical.</p>
      <h3>Advantages of Veneer</h3>
      <ul>
        <li>100% natural wood — unique grain, figure, and character</li>
        <li>Can be sanded and refinished multiple times</li>
        <li>Timeless aesthetic that improves with age</li>
        <li>Premium appearance that clients immediately recognise as authentic</li>
      </ul>
      <h2>Our Recommendation</h2>
      <p>Use laminate for high-traffic kitchen surfaces, office furniture, and anywhere durability outweighs aesthetics. Reserve veneer for feature walls, statement furniture, and hospitality projects where authentic luxury is non-negotiable.</p>
    `,
  },
  {
    id: "blog-5",
    slug: "modular-kitchen-plywood-thickness-guide",
    title: "The Complete Plywood Thickness Guide for Modular Kitchens",
    excerpt:
      "Using the wrong plywood thickness in a modular kitchen is one of the most common and costly mistakes in interior projects. This guide tells you exactly what to use and where.",
    category: "Buying Guide",
    author: "WoodCraft Editorial Team",
    authorRole: "Technical Content Team",
    date: "2024-07-02T10:00:00Z",
    coverImage: "/images/blogs/blog-kitchen-thickness.jpg",
    readTime: 6,
    tags: ["Modular Kitchen", "Plywood Thickness", "Buying Guide", "Interior"],
    content: `
      <h2>Standard Thickness Recommendations</h2>
      <h3>Cabinet Carcases (Base & Wall Units)</h3>
      <p>Use <strong>18mm BWP Grade plywood</strong> for all cabinet carcases. This is the structural core of your modular kitchen — it must bear the weight of appliances, cookware, and years of daily use. Never use MR grade for kitchen carcases.</p>
      <h3>Shutters (Cabinet Doors)</h3>
      <p>Use <strong>18mm plywood or MDF</strong> faced with laminate or veneer. HDF (High Density Fibreboard) is preferred for routed profile shutters as it machines cleanly without chipping.</p>
      <h3>Shelves</h3>
      <p><strong>12mm BWP plywood</strong> for shelves carrying light loads (crockery, glasses). <strong>18mm BWP plywood</strong> for shelves carrying heavy items (appliances, heavy pots).</p>
      <h3>Drawer Bottoms</h3>
      <p><strong>6mm or 9mm BWP plywood</strong> — these are non-structural but must be moisture-resistant.</p>
      <h3>Backs / Rear Panels</h3>
      <p><strong>6mm BWP plywood</strong> is sufficient for rear panels, though some designers prefer 9mm for rigidity.</p>
      <h2>Grade Specification Summary</h2>
      <p>Without exception, use <strong>BWP Grade (IS:303)</strong> throughout the kitchen. The cost difference versus MR grade is typically ₹500–800 per sheet — a negligible amount relative to the total project cost and the risk of delamination from steam exposure.</p>
    `,
  },
  {
    id: "blog-6",
    slug: "sustainable-wood-products-fsc-certification",
    title: "Sustainable Wood Products: What FSC & SVLK Certification Means",
    excerpt:
      "Architects and interior designers increasingly face questions from clients about the environmental credentials of materials. Here's what forest certification actually guarantees.",
    category: "Sustainability",
    author: "Ananya Reddy",
    authorRole: "Sustainability Lead, WoodCraft",
    date: "2024-07-15T10:00:00Z",
    coverImage: "/images/blogs/blog-sustainability.jpg",
    readTime: 7,
    tags: ["FSC", "Sustainability", "Green Building", "LEED", "Environment"],
    content: `
      <h2>The Case for Certified Wood</h2>
      <p>Global deforestation is a genuine crisis. The construction and furniture industry is one of the largest consumers of wood products. Choosing certified wood is one of the most impactful decisions an architect or designer can make.</p>
      <h2>FSC Certification</h2>
      <p>The Forest Stewardship Council (FSC) is the world's most rigorous forest certification system. FSC-certified forests are independently audited to ensure responsible management: biodiversity is protected, local community rights are respected, and harvesting rates do not exceed the forest's capacity to regenerate.</p>
      <h2>SVLK (Indonesia)</h2>
      <p>SVLK (Sistem Verifikasi Legalitas Kayu) is Indonesia's mandatory timber legality verification system. All Indonesian wood exports — including teak veneer — must carry SVLK documentation, ensuring legal harvesting and chain of custody.</p>
      <h2>LEED Credits</h2>
      <p>Projects targeting LEED certification can earn credits under <strong>MR Credit 7 (Certified Wood)</strong> by specifying FSC-certified wood products. WoodCraft can provide FSC chain-of-custody documentation for all certified products in our range.</p>
    `,
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug);
}

export function getBlogsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((b) => b.category === category);
}

export function getAllBlogCategories(): string[] {
  return [...new Set(blogPosts.map((b) => b.category))];
}

export function getRecentBlogs(limit = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
