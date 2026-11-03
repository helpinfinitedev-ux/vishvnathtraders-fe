import { api } from "./api";

export interface CreateOrderPayload {
  userId: string;
  cartId: string;
  address: string;
  deliveryAddress?: string;
  phoneNumber: string;
  expectedDeliveryDate?: string | null;
  expectedDeliveryTime?: string | null;
  totalAmount?: number;
  notes?: string;
  paymentMethod?: string;
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
}

export interface Order {
  _id: string;
  orderNo?: string;
  userId: any;
  items: any[];
  address: string;
  deliveryAddress?: string;
  phoneNumber: string;
  totalAmount: number;
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: string;
  notes?: string;
  status: "preparing" | "shipped" | "in-transit" | "delivered";
  acceptanceStatus: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export const orderService = {
  /**
   * Create an order from cart via POST /orders
   */
  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const data = await api.post<{ order: Order }>("/orders", payload);
    return data.order;
  },

  /**
   * List user orders via GET /orders/users/:userId
   */
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const data = await api.get<{ orders: Order[] }>(`/orders/users/${userId}`);
      return Array.isArray(data.orders) ? data.orders : [];
    } catch {
      return [];
    }
  },

  /**
   * Get single order by ID via GET /orders/:id
   */
  async getOrderById(id: string): Promise<Order | null> {
    try {
      const data = await api.get<{ order: Order }>(`/orders/${id}`);
      return data.order || null;
    } catch {
      return null;
    }
  },
};
