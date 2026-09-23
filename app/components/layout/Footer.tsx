// =============================================================================
// Footer — site-wide footer with links, contact info, social icons
// =============================================================================

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { categories } from "@/data/categories";

// Inline SVG social icons — lucide-react doesn't include these in this version
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);


const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Products", href: "/products" },
  { label: "Blog & Guides", href: "/blogs" },
  { label: "Become a Distributor", href: "/distributor" },
  { label: "Contact Us", href: "/contact" },
];

const SOCIAL_ICONS = [
  { icon: InstagramIcon, href: SITE_CONFIG.social.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: SITE_CONFIG.social.facebook, label: "Facebook" },
  { icon: LinkedinIcon, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: YoutubeIcon, href: SITE_CONFIG.social.youtube, label: "YouTube" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1c1c1c] text-white" role="contentinfo">
      {/* Top decorative wood-grain border */}
      <div className="h-1 bg-gradient-to-r from-[#c8956c] via-[#e8b088] to-[#c8956c]" aria-hidden="true" />

      <div className="container-site py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="36" height="36" viewBox="0 0 38 38" fill="none" aria-hidden="true">
                <rect width="38" height="38" rx="8" fill="#c8956c" />
                <path d="M8 12 Q19 10 30 12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M8 17 Q19 15 30 17" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M8 22 Q19 20 30 22" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M8 27 Q19 25 30 27" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M10 10 L14 26 L19 18 L24 26 L28 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-[1.05rem] font-semibold text-white">WoodCraft</span>
                <span className="text-[0.6rem] text-[#c8956c] tracking-[0.12em] uppercase font-medium">Premium</span>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-[240px]">
              India&apos;s trusted manufacturer of ISI-certified plywood, blockboard, veneer, and laminates.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2" aria-label="Social media links">
              {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#c8956c] transition-colors duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-5">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#c8956c] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Product Categories ── */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-5">Products</h3>
            <ul className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="text-sm text-white/60 hover:text-[#c8956c] transition-colors duration-150"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-5">Get in Touch</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-[#c8956c] transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#c8956c]" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-[#c8956c] transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#c8956c]" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#c8956c]" />
                  <address className="not-italic">
                    {SITE_CONFIG.address.line1},<br />
                    {SITE_CONFIG.address.line2},<br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} – {SITE_CONFIG.address.pin}
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
