import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";
import { getCatalogueProductsByCategory } from "@/data/catalogue";
import { CatalogueGrid } from "@/components/CatalogueGrid";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);
  if (!category) return {};
  
  return {
    title: `${category.name} | WoodCraft Premium`,
    description: `Explore our collection of ${category.name} including top quality products.`,
  };
}

export default async function CatalogueCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  const category = getCategoryBySlug(categorySlug);
  
  if (!category) {
    notFound();
  }

  const allProducts = getCatalogueProductsByCategory(categorySlug);

  return (
    <CatalogueGrid 
      category={category} 
      allProducts={allProducts} 
    />
  );
}
