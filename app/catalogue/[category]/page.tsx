import { notFound } from "next/navigation";
import { getCategoryBySlug as getStaticCategoryBySlug } from "@/data/categories";
import { getCatalogueProductsByCategory } from "@/data/catalogue";
import { CatalogueGrid } from "@/components/CatalogueGrid";
import { categoryService } from "@/services/categoryService";
import { productService } from "@/services/productService";
import type { CatalogueProduct } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  let category = null;
  try {
    category = await categoryService.getCategoryBySlug(resolvedParams.category);
  } catch {
    category = null;
  }
  if (!category) {
    category = getStaticCategoryBySlug(resolvedParams.category);
  }
  if (!category) return {};
  
  return {
    title: `${category.name} | WoodCraft Premium`,
    description: `Explore our collection of ${category.name} including top quality products.`,
  };
}

export default async function CatalogueCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  
  let category = null;
  try {
    category = await categoryService.getCategoryBySlug(categorySlug);
  } catch {
    category = null;
  }
  if (!category) {
    category = getStaticCategoryBySlug(categorySlug);
  }
  
  if (!category) {
    notFound();
  }

  const staticProducts = getCatalogueProductsByCategory(categorySlug);
  let liveProducts: CatalogueProduct[] = [];

  try {
    const res = await productService.getProducts({ categorySlug, limit: 100 });
    if (res && res.products && res.products.length > 0) {
      liveProducts = res.products.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category,
        brand: p.brand,
        sizes: p.sizes,
        thickness: p.thickness,
        images: p.images,
        description: p.description || p.shortDescription,
        type: p.specifications?.["Type"],
        subcategory: p.specifications?.["Subcategory"],
      }));
    }
  } catch {
    // Keep fallback
  }

  const allProducts = liveProducts.length > 0 ? liveProducts : staticProducts;

  return (
    <CatalogueGrid 
      category={category} 
      allProducts={allProducts} 
    />
  );
}
