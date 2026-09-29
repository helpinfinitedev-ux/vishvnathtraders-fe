"use client";

// =============================================================================
// PRODUCTS (SHOP) PAGE — filter sidebar + sort + responsive product grid
// All filtering/sorting is client-side on static data
// =============================================================================

import { useState, useMemo } from "react";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { PageBanner } from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/Button";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { ProductCard } from "@/components/products/ProductCard";
import { products, PRICE_RANGE } from "@/data/products";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import type { ProductFilters, SortOption } from "@/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "name-asc", label: "Name: A–Z" },
];

const ITEMS_PER_PAGE = 9;

const DEFAULT_FILTERS: ProductFilters = {
  categories: [],
  grades: [],
  thicknesses: [],
  priceRange: PRICE_RANGE,
};

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [filters, setFilters] = useState<ProductFilters>({
    ...DEFAULT_FILTERS,
    categories: initialCategory ? [initialCategory] : [],
  });
  const [sort, setSort] = useState<SortOption>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      // if (filters.grades.length && !filters.grades.includes(p.grade)) return false;
      if (filters.thicknesses.length && !p.thickness.some((t) => filters.thicknesses.includes(t))) return false;
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
      return true;
    });
  }, [filters]);

  // ── Sorting ────────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc": return arr.sort((a, b) => a.price - b.price);
      case "price-desc": return arr.sort((a, b) => b.price - a.price);
      case "newest": return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case "name-asc": return arr.sort((a, b) => a.name.localeCompare(b.name));
      default: return arr.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filtered, sort]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const handleFilterChange = (f: ProductFilters) => {
    setFilters(f);
    setPage(1);
  };

  // Active filter tags
  const activeTags = [
    ...filters.categories.map((c) => ({ label: categories.find((cat) => cat.slug === c)?.name ?? c, key: `cat:${c}`, clear: () => setFilters((f) => ({ ...f, categories: f.categories.filter((v) => v !== c) })) })),
    ...filters.grades.map((g) => ({ label: g, key: `grade:${g}`, clear: () => setFilters((f) => ({ ...f, grades: f.grades.filter((v) => v !== g) })) })),
    ...filters.thicknesses.map((t) => ({ label: t, key: `thickness:${t}`, clear: () => setFilters((f) => ({ ...f, thicknesses: f.thicknesses.filter((v) => v !== t) })) })),
  ];

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* ── Page Banner ── */}
      <PageBanner
        title="Products"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      {/* ── Toolbar: sort + view + filter toggle ── */}
      <div
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "var(--space-5) 0",
        }}
      >
        <div className="container-site">
          {/* Main toolbar row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between" style={{ gap: "var(--space-4)" }}>
            {/* Left — product count */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "var(--color-muted)",
                fontWeight: 500,
              }}
            >
              Showing{" "}
              <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>
                {sorted.length}
              </span>{" "}
              products
            </p>

            {/* Right — controls */}
            <div className="flex items-center" style={{ gap: "var(--space-3)" }}>
              {/* Sort dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  aria-label="Sort products"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--color-primary)",
                    background: "var(--color-bg)",
                    border: "1.5px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.625rem 2.5rem 0.625rem 1rem",
                    cursor: "pointer",
                    outline: "none",
                    minHeight: "44px",
                    transition: "border-color var(--transition), box-shadow var(--transition)",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "16px",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,149,108,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* View toggle — desktop only */}
              <div
                className="hidden md:flex items-center overflow-hidden"
                style={{
                  border: "1.5px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    background: view === "grid" ? "var(--color-accent)" : "transparent",
                    color: view === "grid" ? "#fff" : "var(--color-muted)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all var(--transition)",
                  }}
                >
                  <LayoutGrid className="w-[18px] h-[18px]" />
                </button>
                <div style={{ width: "1px", height: "24px", background: "var(--color-border)" }} />
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "44px",
                    height: "44px",
                    background: view === "list" ? "var(--color-accent)" : "transparent",
                    color: view === "list" ? "#fff" : "var(--color-muted)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all var(--transition)",
                  }}
                >
                  <List className="w-[18px] h-[18px]" />
                </button>
              </div>

              {/* Mobile filter toggle */}
              <button
                className="md:hidden"
                onClick={() => setMobileSidebarOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                  padding: "0.625rem 1.25rem",
                  minHeight: "44px",
                  background: "var(--color-accent-light)",
                  color: "var(--color-accent-dark)",
                  border: "1.5px solid rgba(200,149,108,0.25)",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all var(--transition)",
                }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Active filter tags row */}
          {activeTags.length > 0 && (
            <div
              className="flex flex-wrap items-center"
              style={{
                gap: "var(--space-2)",
                marginTop: "var(--space-4)",
                paddingTop: "var(--space-4)",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginRight: "var(--space-1)",
                }}
              >
                Active:
              </span>
              {activeTags.map((tag) => (
                <button
                  key={tag.key}
                  onClick={tag.clear}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "var(--space-1) var(--space-3)",
                    background: "var(--color-accent-light)",
                    color: "var(--color-accent-dark)",
                    border: "1px solid rgba(200,149,108,0.2)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all var(--transition)",
                  }}
                  aria-label={`Remove filter: ${tag.label}`}
                >
                  {tag.label}
                  <X className="w-3 h-3" />
                </button>
              ))}
              <button
                onClick={clearFilters}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                  marginLeft: "var(--space-2)",
                  fontFamily: "var(--font-body)",
                  transition: "color var(--transition)",
                }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="container-site py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSidebar filters={filters} onChange={handleFilterChange} onClear={clearFilters} />
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-4xl mb-4">🪵</p>
                <h2 className="font-serif text-xl font-semibold text-[#1c1c1c] mb-2">No products found</h2>
                <p className="text-[#6b7280] text-sm mb-6">Try adjusting your filters to see more results.</p>
                <Button variant="wood" size="md" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <>
                <div className={cn(
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                )}>
                  {paginated.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load more */}
                {hasMore && (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-7)" }}>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-3)",
                        padding: "0.875rem 2.5rem",
                        minHeight: "48px",
                        background: "var(--color-surface)",
                        color: "var(--color-accent-dark)",
                        border: "1.5px solid var(--color-border)",
                        borderRadius: "var(--radius-full)",
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        boxShadow: "var(--shadow-sm)",
                        transition: "all var(--transition)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-accent)";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.borderColor = "var(--color-accent)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "var(--shadow-wood)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--color-surface)";
                        e.currentTarget.style.color = "var(--color-accent-dark)";
                        e.currentTarget.style.borderColor = "var(--color-border)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                      }}
                    >
                      Load More
                      <span
                        style={{
                          padding: "2px 10px",
                          background: "var(--color-accent-light)",
                          borderRadius: "var(--radius-full)",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "var(--color-accent-dark)",
                        }}
                      >
                        {sorted.length - paginated.length} left
                      </span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative ml-auto w-[300px] bg-white h-full overflow-y-auto p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-semibold">Filters</h2>
              <button onClick={() => setMobileSidebarOpen(false)} aria-label="Close filters">
                <X className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>
            <FilterSidebar filters={filters} onChange={handleFilterChange} onClear={clearFilters} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageInner />
    </Suspense>
  );
}
