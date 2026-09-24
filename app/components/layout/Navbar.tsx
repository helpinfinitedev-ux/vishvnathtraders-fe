// =============================================================================
// Navbar — split-navigation layout
//   LEFT  : Home · About · Products (mega-dropdown)
//   CENTER: Brand logo / wordmark (always perfectly centred)
//   RIGHT : Blog · Contact · [Distributor CTA]
// Mobile  : hamburger → right-side sliding drawer
// =============================================================================
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const LEFT_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const PRODUCT_DROPDOWN = [
  { label: "All Products", href: "/products" },
  { label: "Plywood", href: "/products?category=plywood" },
  { label: "Blockboard", href: "/products?category=blockboard" },
  { label: "Veneer", href: "/products?category=veneer" },
  { label: "Laminates", href: "/products?category=laminates" },
  { label: "Flush Doors", href: "/products?category=flush-doors" },
  { label: "MDF & HDF", href: "/products?category=mdf" },
];

const RIGHT_LINKS = [
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

// ---------------------------------------------------------------------------
// Logo mark — same SVG as Footer for brand consistency
// ---------------------------------------------------------------------------
function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <rect width="38" height="38" rx="8" fill="#c8956c" />
      <path d="M8 12 Q19 10 30 12" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M8 17 Q19 15 30 17" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M8 22 Q19 20 30 22" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M8 27 Q19 25 30 27" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path
        d="M10 10 L14 26 L19 18 L24 26 L28 10"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Products dropdown panel (desktop)
// ---------------------------------------------------------------------------
function ProductsDropdown({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      role="menu"
      aria-label="Products submenu"
      style={{
        position: "absolute",
        top: "calc(100% + 14px)",
        left: "50%",
        transform: `translateX(-50%) translateY(${isOpen ? "0" : "-8px"})`,
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? "visible" : "hidden",
        transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-md)",
        padding: "0.5rem",
        minWidth: "196px",
        zIndex: 60,
      }}
    >
      {/* Arrow pointer */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-6px",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: "12px",
          height: "12px",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRight: "none",
          borderBottom: "none",
        }}
      />
      {PRODUCT_DROPDOWN.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          role="menuitem"
          onClick={onClose}
          className="dd-item"
          style={{
            display: "block",
            padding: "0.5rem 0.875rem",
            fontSize: "0.875rem",
            color: "var(--color-primary)",
            borderRadius: "var(--radius-sm)",
            transition: "background var(--transition), color var(--transition)",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Navbar
// ---------------------------------------------------------------------------
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      productsButtonRef.current &&
      !productsButtonRef.current.contains(e.target as Node)
    ) {
      setProductsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (productsOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [productsOpen, handleOutsideClick]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Shared inline style for nav links
  const navLinkStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-heading)",
    fontSize: "0.925rem",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    padding: "0.3rem 0",
    position: "relative" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: "0.25rem",
    textDecoration: "none",
    color: active ? "var(--color-accent)" : "var(--color-primary)",
    transition: "color var(--transition)",
  });

  return (
    <>
      {/* ================================================================
          FIXED HEADER
      ================================================================ */}
      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "4.5rem",
          background: scrolled ? "rgba(250,250,248,0.94)" : "rgba(250,250,248,0.80)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: `1px solid ${scrolled ? "var(--color-border)" : "transparent"}`,
          boxShadow: scrolled ? "var(--shadow-sm)" : "none",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
        }}
      >
        <div
          className="container-site"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* ── LEFT NAV ──────────────────────────────────────── */}
          <nav
            aria-label="Primary left navigation"
            className="nav-left"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3rem",
              flex: 1,

            }}
          >
            {LEFT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="nav-link-hover"
                style={navLinkStyle(isActive(link.href))}
              >
                {link.label}
                {/* Active underline */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    borderRadius: "1px",
                    background: "var(--color-accent)",
                    transform: isActive(link.href) ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.25s ease",
                  }}
                />
              </Link>
            ))}

            {/* Products with dropdown */}
            <div style={{ position: "relative" }}>
              <button
                ref={productsButtonRef}
                id="products-menu-button"
                aria-haspopup="true"
                aria-expanded={productsOpen}
                aria-controls="products-dropdown"
                onClick={() => setProductsOpen((v) => !v)}
                className="nav-link-hover"
                style={{
                  ...navLinkStyle(isActive("/products")),
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Products
                <ChevronDown
                  size={13}
                  style={{
                    transition: "transform 0.2s ease",
                    transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    left: 0,
                    right: 0,
                    height: "2px",
                    borderRadius: "1px",
                    background: "var(--color-accent)",
                    transform: isActive("/products") ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.25s ease",
                  }}
                />
              </button>

              <div ref={dropdownRef} id="products-dropdown">
                <ProductsDropdown
                  isOpen={productsOpen}
                  onClose={() => setProductsOpen(false)}
                />
              </div>
            </div>
          </nav>

          {/* ── CENTER LOGO ───────────────────────────────────── */}
          <Link
            href="/"
            aria-label="WoodCraft Premium – go to homepage"
            className="logo-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
              padding: "0 1.5rem",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            <LogoMark size={40} />
            <div style={{ lineHeight: 1 }}>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--color-primary)",
                  margin: 0,
                }}
              >
                WoodCraft
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  fontWeight: 500,
                  margin: 0,
                  marginTop: "3px",
                }}
              >
                Premium
              </p>
            </div>
          </Link>

          {/* ── RIGHT NAV ─────────────────────────────────────── */}
          <nav
            aria-label="Primary right navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3rem",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {/* Desktop right links */}
            <div className="nav-right-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {RIGHT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="nav-link-hover"
                  style={navLinkStyle(isActive(link.href))}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      borderRadius: "1px",
                      background: "var(--color-accent)",
                      transform: isActive(link.href) ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </Link>
              ))}

              {/* Distributor CTA pill */}
              <Link
                href="/distributor"
                id="distributor-cta"
                aria-label="Become a distributor"
                className="distributor-btn"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "0.45rem 1.15rem",
                  borderRadius: "var(--radius-full)",
                  background: isActive("/distributor")
                    ? "var(--color-accent-dark)"
                    : "var(--color-accent)",
                  color: "#ffffff",
                  boxShadow: "var(--shadow-wood)",
                  transition:
                    "background var(--transition), box-shadow var(--transition), transform var(--transition)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                Distributor
                <ExternalLink size={11} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Hamburger — visible only on mobile */}
            <button
              id="mobile-menu-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMobileOpen((v) => !v)}
              className="hamburger-btn"
              style={{
                background: "transparent",
                border: "1px solid var(--color-border)",
                cursor: "pointer",
                color: "var(--color-primary)",
                padding: "0.4rem",
                borderRadius: "var(--radius-sm)",
                display: "none", // shown via CSS on mobile
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color var(--transition)",
              }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* ================================================================
          MOBILE — BACKDROP SCRIM
      ================================================================ */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 55,
          background: "rgba(28,28,28,0.45)",
          backdropFilter: "blur(3px)",
          opacity: mobileOpen ? 1 : 0,
          visibility: mobileOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s",
        }}
      />

      {/* ================================================================
          MOBILE — DRAWER
      ================================================================ */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 60,
          width: "min(85vw, 340px)",
          background: "var(--color-surface)",
          boxShadow: "var(--shadow-lg)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <LogoMark size={30} />
            <div style={{ lineHeight: 1 }}>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-primary)", margin: 0 }}>
                WoodCraft
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.5rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)", fontWeight: 500, margin: 0, marginTop: "3px" }}>
                Premium
              </p>
            </div>
          </Link>
          <button
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--color-muted)", padding: "0.3rem" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav aria-label="Mobile navigation links" style={{ padding: "0.75rem 0", flex: 1 }}>
          {/* Left links */}
          {LEFT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              style={{
                display: "block",
                padding: "0.875rem 1.5rem",
                fontFamily: "var(--font-heading)",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: isActive(link.href) ? "var(--color-accent)" : "var(--color-primary)",
                borderLeft: `3px solid ${isActive(link.href) ? "var(--color-accent)" : "transparent"}`,
                background: isActive(link.href) ? "var(--color-accent-light)" : "transparent",
                transition: "background var(--transition)",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Products accordion */}
          <div>
            <button
              onClick={() => setMobileProductsOpen((v) => !v)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.875rem 1.5rem",
                fontFamily: "var(--font-heading)",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: isActive("/products") ? "var(--color-accent-light)" : "transparent",
                color: isActive("/products") ? "var(--color-accent)" : "var(--color-primary)",
                borderLeft: `3px solid ${isActive("/products") ? "var(--color-accent)" : "transparent"}`,
                border: "none",
                borderTop: "none",
                borderRight: "none",
                borderBottom: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
              aria-expanded={mobileProductsOpen}
            >
              Products
              <ChevronDown
                size={16}
                style={{
                  transition: "transform 0.2s",
                  transform: mobileProductsOpen ? "rotate(180deg)" : "rotate(0deg)",
                  color: "var(--color-muted)",
                }}
              />
            </button>
            {/* Accordion panel */}
            <div
              style={{
                maxHeight: mobileProductsOpen ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div style={{ background: "var(--color-accent-light)", paddingBlock: "0.375rem" }}>
                {PRODUCT_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.6rem 1.5rem 0.6rem 2.25rem",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      textDecoration: "none",
                      color: "var(--color-primary)",
                      transition: "color var(--transition)",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right links */}
          {RIGHT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              style={{
                display: "block",
                padding: "0.875rem 1.5rem",
                fontFamily: "var(--font-heading)",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: isActive(link.href) ? "var(--color-accent)" : "var(--color-primary)",
                borderLeft: `3px solid ${isActive(link.href) ? "var(--color-accent)" : "transparent"}`,
                background: isActive(link.href) ? "var(--color-accent-light)" : "transparent",
                transition: "background var(--transition)",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Distributor CTA */}
          <div style={{ padding: "1.5rem" }}>
            <Link
              href="/distributor"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                padding: "0.8rem 1.5rem",
                fontFamily: "var(--font-heading)",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                background: "var(--color-accent)",
                color: "#ffffff",
                borderRadius: "var(--radius-full)",
                boxShadow: "var(--shadow-wood)",
              }}
            >
              Become a Distributor
              <ExternalLink size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </nav>

        {/* Decorative bottom accent */}
        <div
          aria-hidden="true"
          style={{
            height: "3px",
            background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-light), var(--color-accent))",
            flexShrink: 0,
          }}
        />
      </aside>

      {/* ================================================================
          SCOPED CSS — responsive rules + hover effects
      ================================================================ */}
      <style>{`
        /* Desktop: hide hamburger */
        @media (min-width: 768px) {
          .hamburger-btn { display: none !important; }
        }

        /* Mobile: hide desktop nav groups, show hamburger */
        @media (max-width: 767px) {
          .nav-left { display: none !important; }
          .nav-right-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }

        /* Logo hover lift */
        .logo-link:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }

        /* Dropdown item hover */
        .dd-item:hover {
          background: var(--color-accent-light) !important;
          color: var(--color-accent-dark) !important;
        }

        /* Nav link hover — colour shift */
        .nav-link-hover:hover {
          color: var(--color-accent) !important;
        }

        /* Nav link hover — underline grow */
        .nav-link-hover:hover > span[aria-hidden] {
          transform: scaleX(1) !important;
        }

        /* Distributor button hover */
        .distributor-btn:hover {
          background: var(--color-accent-dark) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px -4px rgba(200,149,108,0.45) !important;
        }
      `}</style>
    </>
  );
}
