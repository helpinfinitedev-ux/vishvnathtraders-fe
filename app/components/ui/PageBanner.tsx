// =============================================================================
// PageBanner — premium hero banner with breadcrumbs for inner pages
// Features: animated gradient, floating decorative orbs, grain texture,
//           glowing accent line, stylish pill-style breadcrumbs
// Usage: <PageBanner title="About Us" breadcrumbs={[{label:"Home",href:"/"},{label:"About"}]} />
// =============================================================================

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  /** Page title displayed prominently on the banner */
  title: string;
  /** Breadcrumb trail — last item is treated as current page (no link) */
  breadcrumbs: BreadcrumbItem[];
  /** Optional background image URL; falls back to an animated gradient */
  backgroundImage?: string;
  /** Extra classes on the root element */
  className?: string;
}

export function PageBanner({
  title,
  breadcrumbs,
  backgroundImage,
  className,
}: PageBannerProps) {
  return (
    <section
      className={cn("page-banner", className)}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {/* Dark overlay for text legibility */}
      <div className="page-banner__overlay" aria-hidden="true" />

      {/* Decorative grain texture */}
      <div className="page-banner__grain" aria-hidden="true" />

      {/* Floating decorative orbs */}
      <div className="page-banner__orb page-banner__orb--1" aria-hidden="true" />
      <div className="page-banner__orb page-banner__orb--2" aria-hidden="true" />
      <div className="page-banner__orb page-banner__orb--3" aria-hidden="true" />

      {/* Decorative geometric lines */}
      <div className="page-banner__deco-line page-banner__deco-line--1" aria-hidden="true" />
      <div className="page-banner__deco-line page-banner__deco-line--2" aria-hidden="true" />

      {/* Bottom accent border */}
      <div className="page-banner__bottom-glow" aria-hidden="true" />

      {/* Content */}
      <div className="page-banner__content container-site">
        {/* Breadcrumbs above title */}
        <nav aria-label="Breadcrumb" className="page-banner__breadcrumb">
          <ol>
            {breadcrumbs.map((item, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <li key={i}>
                  {/* Separator */}
                  {i > 0 && (
                    <ChevronRight
                      className="page-banner__separator"
                      aria-hidden="true"
                    />
                  )}

                  {isLast ? (
                    <span aria-current="page" className="page-banner__crumb--current">
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <Link href={item.href} className="page-banner__crumb">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="page-banner__crumb">{item.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Title with glowing accent */}
        <h1 className="page-banner__title">
          {title}
          <span className="page-banner__title-glow" aria-hidden="true" />
        </h1>
      </div>
    </section>
  );
}
