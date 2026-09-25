"use client";

// =============================================================================
// PRODUCTS (SHOP) PAGE — filter sidebar + sort + responsive product grid
// All filtering/sorting is client-side on static data
// =============================================================================

import { useState, useMemo } from "react";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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
      {/* Page Header */}
      <div className="bg-white border-b border-[#f0e8de] py-8 md:py-10">
        <div className="container-site">
          <Breadcrumb items={[{ label: "Products" }]} className="mb-3" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#1c1c1c]">
                All Products
              </h1>
              <p className="text-sm text-[#6b7280] mt-1">
                {sorted.length} products found
              </p>
            </div>
            {/* Sort + View toggle */}
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm border border-[#e8ddd4] rounded-[10px] px-3 py-2 text-[#374151] bg-white focus:outline-none focus:border-[#c8956c] cursor-pointer"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              {/* View toggle */}
              <div className="hidden md:flex items-center border border-[#e8ddd4] rounded-[10px] overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={cn("p-2.5 transition-colors", view === "grid" ? "bg-[#c8956c] text-white" : "text-[#6b7280] hover:bg-[#f2e8dc]")}
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={cn("p-2.5 transition-colors", view === "list" ? "bg-[#c8956c] text-white" : "text-[#6b7280] hover:bg-[#f2e8dc]")}
                  aria-label="List view"
                  aria-pressed={view === "list"}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile filter toggle */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden flex items-center gap-2"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>


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
                  <div className="flex justify-center mt-10">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Load More ({sorted.length - paginated.length} remaining)
                    </Button>
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
