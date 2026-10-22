import { api } from "./api";
import type { Category } from "@/types";

export function adaptCategory(raw: any): Category {
  if (!raw) return {} as Category;

  return {
    id: String(raw._id || raw.id || ""),
    slug: raw.slug || "",
    name: raw.name || "",
    description: raw.description || "",
    image: raw.image || "/images/categories/plywood.jpg",
    productCount: typeof raw.productCount === "number" ? raw.productCount : 0,
    subcategories: Array.isArray(raw.subcategories) ? raw.subcategories : [],
  };
}

export const categoryService = {
  /**
   * Fetch all categories from GET /categories
   */
  async getCategories(): Promise<Category[]> {
    const data = await api.get<{ categories: any[] }>("/categories");
    return Array.isArray(data.categories) ? data.categories.map(adaptCategory) : [];
  },

  /**
   * Fetch a single category by slug from GET /categories/slug/:slug
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const data = await api.get<{ category: any }>(`/categories/slug/${encodeURIComponent(slug)}`);
      return data.category ? adaptCategory(data.category) : null;
    } catch (err: any) {
      if (err.statusCode === 404) return null;
      throw err;
    }
  },

  /**
   * Fetch a single category by ID from GET /categories/:id
   */
  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const data = await api.get<{ category: any }>(`/categories/${id}`);
      return data.category ? adaptCategory(data.category) : null;
    } catch (err: any) {
      if (err.statusCode === 404) return null;
      throw err;
    }
  },
};
