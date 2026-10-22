import { api } from "./api";
import type { Testimonial } from "@/types";

export function adaptTestimonial(raw: any): Testimonial {
  if (!raw) return {} as Testimonial;

  const avatar =
    Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images[0]
      : "/window.svg";

  return {
    id: String(raw._id || raw.id || ""),
    name: raw.customerName || "Satisfied Client",
    role: raw.customerLocation || "Verified Customer",
    company: "Architect / Interior Designer",
    message: raw.comment || "",
    rating: Number(raw.rating || 5),
    avatar,
  };
}

export const testimonialService = {
  /**
   * Fetch testimonials from GET /testimonials
   */
  async getTestimonials(page = 1, limit = 20): Promise<Testimonial[]> {
    try {
      const data = await api.get<{ testimonials: any[] }>(
        `/testimonials?page=${page}&limit=${limit}`
      );
      return Array.isArray(data.testimonials)
        ? data.testimonials.map(adaptTestimonial)
        : [];
    } catch {
      return [];
    }
  },

  /**
   * Fetch a single testimonial by ID from GET /testimonials/:id
   */
  async getTestimonialById(id: string): Promise<Testimonial | null> {
    try {
      const data = await api.get<{ testimonial: any }>(`/testimonials/${id}`);
      return data.testimonial ? adaptTestimonial(data.testimonial) : null;
    } catch (err: any) {
      if (err.statusCode === 404) return null;
      throw err;
    }
  },
};
