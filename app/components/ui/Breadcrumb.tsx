// =============================================================================
// Breadcrumb — page-level navigation trail
// Usage: <Breadcrumb items={[{label:"Products",href:"/products"}, {label:"Plywood"}]} />
// =============================================================================

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-sm", className)}>
      <Link
        href="/"
        className="flex items-center gap-1 text-[var(--ink-soft)] hover:text-[var(--burgundy)] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-[#e8ddd4]" aria-hidden="true" />
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-[var(--ink-soft)] hover:text-[var(--burgundy)] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--ink)] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
