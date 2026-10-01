"use client";

import { useState, useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { PageBanner } from "@/components/ui/PageBanner";
import { Button } from "@/components/ui/Button";
import { CatalogueFilters, DEFAULT_CATALOGUE_FILTERS, type CatalogueFiltersState } from "@/components/catalogue/CatalogueFilters";
import { CatalogueCard } from "@/components/catalogue/CatalogueCard";
import { getCategoryBySlug } from "@/data/categories";
import { getCatalogueProductsByCategory } from "@/data/catalogue";

export default function CatalogueCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const category = getCategoryBySlug(categorySlug);
  
  if (!category) {
    notFound();
  }

  const allProducts = getCatalogueProductsByCategory(categorySlug);

  const [filters, setFilters] = useState<CatalogueFiltersState>(DEFAULT_CATALOGUE_FILTERS);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Compute available filter options based on the products in this category
  const availableBrands = useMemo(() => Array.from(new Set(allProducts.map(p => p.brand).filter(Boolean) as string[])), [allProducts]);
  const availableSubcategories = useMemo(() => Array.from(new Set(allProducts.map(p => p.subcategory).filter(Boolean) as string[])), [allProducts]);
  const availableTypes = useMemo(() => Array.from(new Set(allProducts.map(p => p.type).filter(Boolean) as string[])), [allProducts]);
  const availableSizes = useMemo(() => Array.from(new Set(allProducts.flatMap(p => p.sizes || []))), [allProducts]);
  const availableThicknesses = useMemo(() => Array.from(new Set(allProducts.flatMap(p => p.thickness || []))), [allProducts]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (filters.brands.length && (!p.brand || !filters.brands.includes(p.brand))) return false;
      if (filters.subcategories.length && (!p.subcategory || !filters.subcategories.includes(p.subcategory))) return false;
      if (filters.types.length && (!p.type || !filters.types.includes(p.type))) return false;
      if (filters.sizes.length && (!p.sizes || !p.sizes.some((s) => filters.sizes.includes(s)))) return false;
      if (filters.thicknesses.length && (!p.thickness || !p.thickness.some((t) => filters.thicknesses.includes(t)))) return false;
      return true;
    });
  }, [allProducts, filters]);

  const clearFilters = () => setFilters(DEFAULT_CATALOGUE_FILTERS);

  // Generate active tags
  const activeTags = [
    ...filters.brands.map((b) => ({ label: b, clear: () => setFilters(f => ({ ...f, brands: f.brands.filter(v => v !== b) })) })),
    ...filters.subcategories.map((s) => ({ label: s, clear: () => setFilters(f => ({ ...f, subcategories: f.subcategories.filter(v => v !== s) })) })),
    ...filters.types.map((t) => ({ label: t, clear: () => setFilters(f => ({ ...f, types: f.types.filter(v => v !== t) })) })),
    ...filters.sizes.map((s) => ({ label: s, clear: () => setFilters(f => ({ ...f, sizes: f.sizes.filter(v => v !== s) })) })),
    ...filters.thicknesses.map((t) => ({ label: t, clear: () => setFilters(f => ({ ...f, thicknesses: f.thicknesses.filter(v => v !== t) })) })),
  ];

  const hasFilters = availableBrands.length > 0 || availableSubcategories.length > 0 || availableTypes.length > 0 || availableSizes.length > 0 || availableThicknesses.length > 0;

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* ── Page Banner ── */}
      <PageBanner
        title={category.name}
        backgroundImage={category.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Catalogue" },
          { label: category.name },
        ]}
      />

      {/* ── Toolbar: product count + mobile filter toggle ── */}
      <div
        style={{
          background: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border)",
          padding: "var(--space-4) 0",
        }}
      >
        <div className="container-site">
          <div className="flex items-center justify-between">
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
                {filteredProducts.length}
              </span>{" "}
              results
            </p>

            {hasFilters && (
              <button
                className="md:hidden"
                onClick={() => setMobileSidebarOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                  padding: "0.5rem 1rem",
                  background: "var(--color-accent-light)",
                  color: "var(--color-accent-dark)",
                  border: "1.5px solid rgba(111, 23, 38,0.25)",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            )}
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
                  key={tag.label}
                  onClick={tag.clear}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "var(--space-1) var(--space-3)",
                    background: "var(--color-accent-light)",
                    color: "var(--color-accent-dark)",
                    border: "1px solid rgba(111, 23, 38,0.2)",
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
          {hasFilters && (
            <div className="hidden md:block w-64 shrink-0">
              <CatalogueFilters
                filters={filters}
                onChange={setFilters}
                onClear={clearFilters}
                availableBrands={availableBrands}
                availableSubcategories={availableSubcategories}
                availableTypes={availableTypes}
                availableSizes={availableSizes}
                availableThicknesses={availableThicknesses}
              />
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[22px] border border-[var(--color-border)]">
                <p className="text-4xl mb-4">🪵</p>
                <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mb-2">No products found</h2>
                <p className="text-[var(--ink-soft)] text-sm mb-6">Try adjusting your filters to see more results.</p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <CatalogueCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && hasFilters && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <div className="relative ml-auto w-[300px] bg-white h-full overflow-y-auto p-5 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-semibold text-[var(--color-primary)]">Filters</h2>
              <button onClick={() => setMobileSidebarOpen(false)} aria-label="Close filters">
                <X className="w-6 h-6 text-[var(--color-muted)]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto -mx-5 px-5">
              <CatalogueFilters
                filters={filters}
                onChange={setFilters}
                onClear={clearFilters}
                availableBrands={availableBrands}
                availableSubcategories={availableSubcategories}
                availableTypes={availableTypes}
                availableSizes={availableSizes}
                availableThicknesses={availableThicknesses}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
