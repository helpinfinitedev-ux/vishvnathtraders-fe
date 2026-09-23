"use client";

// =============================================================================
// Navbar — sticky header with logo, nav links + dropdown, mobile hamburger
// Becomes opaque on scroll with blur backdrop
// =============================================================================

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/data/siteConfig";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll listener — triggers opaque backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(28,28,28,0.08)]"
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="WoodCraft Premium — Home">
              <div className="relative">
                {/* SVG Logo Mark */}
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:scale-105"
                  aria-hidden="true"
                >
                  <rect width="38" height="38" rx="8" fill="#c8956c" />
                  {/* Wood grain lines */}
                  <path d="M8 12 Q19 10 30 12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M8 17 Q19 15 30 17" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M8 22 Q19 20 30 22" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M8 27 Q19 25 30 27" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" />
                  {/* W letterform */}
                  <path
                    d="M10 10 L14 26 L19 18 L24 26 L28 10"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-[1.1rem] font-semibold text-[#1c1c1c] tracking-tight">
                  WoodCraft
                </span>
                <span className="text-[0.65rem] font-medium text-[#c8956c] tracking-[0.12em] uppercase">
                  Premium
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-8" ref={dropdownRef} aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="relative">
                  {link.children ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.href ? null : link.href
                          )
                        }
                        className={cn(
                          "group relative flex items-center gap-1 py-2 text-[15px] font-medium transition-colors duration-200",
                          isActive(link.href)
                            ? "text-[#c8956c]"
                            : "text-[#374151] hover:text-[#c8956c]"
                        )}
                        aria-expanded={activeDropdown === link.href}
                        aria-haspopup="true"
                      >
                        {link.label}
                        {isActive(link.href) && (
                          <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#c8956c] rounded-full" />
                        )}
                        <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#c8956c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            activeDropdown === link.href && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Dropdown */}
                      {activeDropdown === link.href && (
                        <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-[14px] shadow-[0_8px_32px_rgba(28,28,28,0.12)] border border-[#f2e8dc] overflow-hidden z-50 animate-fade-up">
                          <div className="py-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href!}
                                className={cn(
                                  "block px-4 py-2.5 text-sm transition-colors duration-150",
                                  pathname === child.href
                                    ? "text-[#c8956c] bg-[#f2e8dc] font-medium"
                                    : "text-[#374151] hover:text-[#1c1c1c] hover:bg-[#faf7f4]"
                                )}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "group relative py-2 text-[15px] font-medium transition-colors duration-200",
                        isActive(link.href)
                          ? "text-[#c8956c]"
                          : "text-[#374151] hover:text-[#c8956c]"
                      )}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#c8956c] rounded-full" />
                      )}
                      <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#c8956c] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* ── Desktop Right Actions ── */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                className="text-[#374151]"
              >
                <Search className="w-4.5 h-4.5" />
              </Button>
              <Button variant="wood" size="sm" asChild>
                <Link href="/distributor">Get a Quote</Link>
              </Button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden p-2 rounded-lg text-[#374151] hover:bg-[#f2e8dc] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Mobile navigation"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-16 left-0 right-0 bottom-0 bg-white overflow-y-auto shadow-xl animate-slide-right">
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      isActive(link.href)
                        ? "text-[#c8956c] bg-[#f2e8dc]"
                        : "text-[#374151] hover:bg-[#faf7f4]"
                    )}
                  >
                    {link.label}
                  </Link>
                  {/* Sub-links on mobile */}
                  {link.children && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5">
                      {link.children.slice(1).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href!}
                          className="px-4 py-2 rounded-lg text-sm text-[#6b7280] hover:text-[#c8956c] hover:bg-[#faf7f4] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="p-4 border-t border-[#f2e8dc] mt-2">
              <Button variant="wood" size="lg" className="w-full" asChild>
                <Link href="/distributor">Get a Quote</Link>
              </Button>
              <div className="mt-3 text-center">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-sm text-[#6b7280] hover:text-[#c8956c] transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
