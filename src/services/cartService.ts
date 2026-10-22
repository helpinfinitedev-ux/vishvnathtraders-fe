import { api } from "./api";

export interface BackendCartItem {
  productId: any;
  quantity: number;
  price: number;
  unit: string;
  thickness?: string;
  size?: string;
}

export interface BackendCart {
  _id: string;
  userId: any;
  items: BackendCartItem[];
  totalAmount: number;
}

export const cartService = {
  /**
   * Get user cart from GET /carts/:userId
   */
  async getCart(userId: string): Promise<BackendCart | null> {
    try {
      const data = await api.get<{ cart: BackendCart }>(`/carts/${userId}`);
      return data.cart || null;
    } catch {
      return null;
    }
  },

  /**
   * Add item to cart via POST /carts/:userId/items
   */
  async addItem(
    userId: string,
    item: {
      productId: string;
      quantity: number;
      thickness?: string;
      size?: string;
    }
  ): Promise<BackendCart> {
    const data = await api.post<{ cart: BackendCart }>(`/carts/${userId}/items`, item);
    return data.cart;
  },

  /**
   * Update item quantity via PATCH /carts/:userId/items/:productId
   */
  async updateItem(
    userId: string,
    productId: string,
    payload: {
      quantity: number;
      thickness?: string;
      size?: string;
    }
  ): Promise<BackendCart> {
    const data = await api.patch<{ cart: BackendCart }>(
      `/carts/${userId}/items/${productId}`,
      payload
    );
    return data.cart;
  },

  /**
   * Remove item from cart via DELETE /carts/:userId/items/:productId
   */
  async removeItem(
    userId: string,
    productId: string,
    variants?: { thickness?: string; size?: string }
  ): Promise<BackendCart> {
    const params = new URLSearchParams();
    if (variants?.thickness) params.set("thickness", variants.thickness);
    if (variants?.size) params.set("size", variants.size);

    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await api.delete<{ cart: BackendCart }>(
      `/carts/${userId}/items/${productId}${query}`
    );
    return data.cart;
  },

  /**
   * Clear user cart via DELETE /carts/:userId
   */
  async clearCart(userId: string): Promise<BackendCart> {
    const data = await api.delete<{ cart: BackendCart }>(`/carts/${userId}`);
    return data.cart;
  },
};
