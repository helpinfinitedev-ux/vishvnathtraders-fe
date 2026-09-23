// =============================================================================
// UTILITY — cn() helper for merging Tailwind classes cleanly
// Usage: cn("base-class", condition && "conditional-class", props.className)
// =============================================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Format INR price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Calculate discount percentage
export function getDiscount(price: number, mrp: number): number {
  return Math.round(((mrp - price) / mrp) * 100);
}

// Format ISO date to readable string
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Truncate string to n words
export function truncate(str: string, words = 20): string {
  const parts = str.split(" ");
  if (parts.length <= words) return str;
  return parts.slice(0, words).join(" ") + "…";
}
