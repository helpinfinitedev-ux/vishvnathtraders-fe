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
        className="flex items-center gap-1 text-[#6b7280] hover:text-[#c8956c] transition-colors"
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
              className="text-[#6b7280] hover:text-[#c8956c] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1c1c1c] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
