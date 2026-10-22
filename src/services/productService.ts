import { api } from "./api";
import type { Product, ProductFilters, SortOption } from "@/types";

// =============================================================================
// PRODUCT ADAPTER — Normalizes backend mongoose document to frontend Product
// =============================================================================
export function adaptProduct(raw: any): Product {
  if (!raw) return {} as Product;

  // Resolve category slug
  let categorySlug = "plywood";
  if (Array.isArray(raw.categories) && raw.categories.length > 0) {
    const firstCat = raw.categories[0];
    if (typeof firstCat === "object" && firstCat !== null && firstCat.slug) {
      categorySlug = firstCat.slug;
    } else if (typeof firstCat === "string") {
      categorySlug = firstCat;
    }
  } else if (typeof raw.category === "string") {
    categorySlug = raw.category;
  }

  // Specifications Map/Object conversion
  let specifications: Record<string, string> = {};
  if (raw.specifications) {
    if (raw.specifications instanceof Map) {
      specifications = Object.fromEntries(raw.specifications);
    } else if (typeof raw.specifications === "object") {
      specifications = { ...raw.specifications };
    }
  }

  const images =
    Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images
      : ["/plywood.avif"];

  return {
    id: String(raw._id || raw.id || ""),
    slug: raw.slug || "",
    name: raw.name || "",
    category: categorySlug,
    thickness: Array.isArray(raw.thickness) ? raw.thickness : [],
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    price: Number(raw.price || 0),
    mrp: Number(raw.mrp || raw.price || 0),
    images,
    description: raw.description || "",
    shortDescription: raw.shortDescription || "",
    specifications,
    featured: Boolean(raw.featured),
    inStock: raw.inStock !== undefined ? Boolean(raw.inStock) : true,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    createdAt: raw.createdAt || new Date().toISOString(),
    useCases: Array.isArray(raw.useCases) ? raw.useCases : [],
    benefits: Array.isArray(raw.benefits) ? raw.benefits : [],
    faqs: Array.isArray(raw.faqs) ? raw.faqs : [],
    warranty: raw.warranty || "15 Years",
    brand: raw.brand || "WoodCraft Premium",
    pricePerSqFt: raw.pricePerSqFt ? Number(raw.pricePerSqFt) : undefined,
  };
}

export interface GetProductsParams {
  search?: string;
  categorySlug?: string;
  categoryId?: string;
  thickness?: string;
  size?: string;
  brand?: string;
  featured?: boolean;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: "featured" | "newest" | "oldest" | "price_asc" | "price_desc" | "name_asc" | "name_desc";
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const productService = {
  /**
   * Fetch paginated/filtered products from GET /products
   */
  async getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
    const query = new URLSearchParams();

    if (params.search) query.set("search", params.search);
    if (params.categorySlug) query.set("categorySlug", params.categorySlug);
    if (params.categoryId) query.set("categoryId", params.categoryId);
    if (params.thickness) query.set("thickness", params.thickness);
    if (params.size) query.set("size", params.size);
    if (params.brand) query.set("brand", params.brand);
    if (params.featured !== undefined) query.set("featured", String(params.featured));
    if (params.inStock !== undefined) query.set("inStock", String(params.inStock));
    if (params.minPrice !== undefined) query.set("minPrice", String(params.minPrice));
    if (params.maxPrice !== undefined) query.set("maxPrice", String(params.maxPrice));
    if (params.page !== undefined) query.set("page", String(params.page));
    if (params.limit !== undefined) query.set("limit", String(params.limit));
    if (params.sort) query.set("sort", params.sort);

    const queryString = query.toString();
    const endpoint = queryString ? `/products?${queryString}` : "/products";

    const data = await api.get<{ products: any[]; pagination: any }>(endpoint);

    return {
      products: Array.isArray(data.products) ? data.products.map(adaptProduct) : [],
      pagination: data.pagination || {
        total: data.products?.length || 0,
        page: params.page || 1,
        limit: params.limit || 20,
        totalPages: 1,
      },
    };
  },

  /**
   * Fetch all products from GET /products/all
   */
  async getAllProducts(): Promise<Product[]> {
    const data = await api.get<{ products: any[] }>("/products/all");
    return Array.isArray(data.products) ? data.products.map(adaptProduct) : [];
  },

  /**
   * Fetch a single product by slug from GET /products/slug/:slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const data = await api.get<{ product: any }>(`/products/slug/${encodeURIComponent(slug)}`);
      return data.product ? adaptProduct(data.product) : null;
    } catch (err: any) {
      if (err.statusCode === 404) return null;
      throw err;
    }
  },

  /**
   * Fetch a single product by ID from GET /products/:id
   */
  async getProductById(id: string): Promise<Product | null> {
    try {
      const data = await api.get<{ product: any }>(`/products/${id}`);
      return data.product ? adaptProduct(data.product) : null;
    } catch (err: any) {
      if (err.statusCode === 404) return null;
      throw err;
    }
  },

  /**
   * Fetch related products from GET /products/:id/related
   */
  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    try {
      const data = await api.get<{ products: any[] }>(`/products/${productId}/related?limit=${limit}`);
      return Array.isArray(data.products) ? data.products.map(adaptProduct) : [];
    } catch {
      return [];
    }
  },

  /**
   * Fetch filter options from GET /products/filters
   */
  async getProductFilters(): Promise<{
    thickness: string[];
    sizes: string[];
    brands: string[];
    priceRange: { min: number; max: number };
  }> {
    const data = await api.get<{
      filters: {
        thickness: string[];
        sizes: string[];
        brands: string[];
        priceRange: { min: number; max: number };
      };
    }>("/products/filters");

    return data.filters || {
      thickness: [],
      sizes: [],
      brands: [],
      priceRange: { min: 0, max: 10000 },
    };
  },
};
