import { notFound } from "next/navigation";
import { getCatalogueProductBySlug as getStaticCatalogueProductBySlug } from "@/data/catalogue";
import { getCategoryBySlug as getStaticCategoryBySlug } from "@/data/categories";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductInfoSections } from "@/components/ProductInfoSections";
import { productService } from "@/services/productService";
import { categoryService } from "@/services/categoryService";

export async function generateMetadata({ params }: { params: Promise<{ category: string; product: string }> }) {
  const resolvedParams = await params;
  let product: any = null;
  try {
    product = await productService.getProductBySlug(resolvedParams.product);
  } catch {
    product = null;
  }
  if (!product) {
    product = getStaticCatalogueProductBySlug(resolvedParams.product);
  }
  if (!product) return {};
  return {
    title: `${product.name} | WoodCraft Premium`,
    description: product.description || product.shortDescription,
  };
}

export default async function CatalogueProductPage({ params }: { params: Promise<{ category: string; product: string }> }) {
  const resolvedParams = await params;
  const productSlug = resolvedParams.product;
  const categorySlug = resolvedParams.category;

  let product: any = null;
  try {
    const liveProduct = await productService.getProductBySlug(productSlug);
    if (liveProduct) {
      product = {
        id: liveProduct.id,
        slug: liveProduct.slug,
        name: liveProduct.name,
        category: liveProduct.category,
        brand: liveProduct.brand,
        sizes: liveProduct.sizes,
        thickness: liveProduct.thickness,
        images: liveProduct.images,
        description: liveProduct.description || liveProduct.shortDescription,
        price: liveProduct.price,
        type: liveProduct.specifications?.["Type"],
        productLine: liveProduct.specifications?.["Product Line"],
        subcategory: liveProduct.specifications?.["Subcategory"],
      };
    }
  } catch {
    // fallback
  }

  if (!product) {
    product = getStaticCatalogueProductBySlug(productSlug);
  }

  let category = null;
  try {
    category = await categoryService.getCategoryBySlug(categorySlug);
  } catch {
    category = null;
  }
  if (!category) {
    category = getStaticCategoryBySlug(categorySlug);
  }

  if (!product || !category || product.category !== category.slug) {
    notFound();
  }

  return (
    <>
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
        slug={product.slug}
      />
      <ProductInfoSections product={product} />
    </>
  );
}
