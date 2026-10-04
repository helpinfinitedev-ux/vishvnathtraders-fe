import { notFound } from "next/navigation";
import { getCatalogueProductBySlug } from "@/data/catalogue";
import { getCategoryBySlug } from "@/data/categories";
import { ProductDetail } from "@/components/ProductDetail";

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }) {
  const resolvedParams = await params;
  const product = getCatalogueProductBySlug(resolvedParams.product);
  if (!product) return {};
  return {
    title: `${product.name} | WoodCraft Premium`,
    description: product.description,
  };
}

export default async function CatalogueProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const resolvedParams = await params;
  const product = getCatalogueProductBySlug(resolvedParams.product);
  const category = getCategoryBySlug(resolvedParams.category);

  if (!product || !category || product.category !== category.slug) {
    notFound();
  }

  return (
    <ProductDetail 
      name={product.name}
      brand={product.brand}
      tag={product.type || product.productLine || "Premium Quality"}
      description={product.description}
      warranty="5 years warranty"
      images={product.images}
      price={(product as any).price || 1450}
      sizes={product.sizes}
      thicknesses={product.thickness}
    />
  );
}
