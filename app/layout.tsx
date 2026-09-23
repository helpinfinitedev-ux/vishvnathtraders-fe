import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactIcons } from "@/components/layout/FloatingContactIcons";
import { SITE_CONFIG } from "@/data/siteConfig";

// =============================================================================
// ROOT METADATA — shared across all pages, each page can override
// =============================================================================
export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "plywood",
    "blockboard",
    "veneer",
    "laminates",
    "ISI certified plywood",
    "BWP plywood",
    "marine plywood",
    "wood products India",
    "WoodCraft Premium",
    "building materials",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// =============================================================================
// ROOT LAYOUT — Navbar + main content + Footer + FloatingContactIcons
// All three layout components are mounted ONCE here — never repeated per page
// =============================================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fafaf8] antialiased">
        {/* Global header — sticky, fixed */}
        <Navbar />

        {/* Page content — pt accounts for fixed header height */}
        <main className="flex-1 pt-16 md:pt-20" id="main-content">
          {children}
        </main>

        {/* Global footer */}
        <Footer />

        {/* Floating WhatsApp / Call / Email icons */}
        <FloatingContactIcons />
      </body>
    </html>
  );
}
