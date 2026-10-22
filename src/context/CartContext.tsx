"use client";

// =============================================================================
// CartContext — global cart state with backend sync and localStorage fallback
// Provides: add, remove, updateQuantity, clearCart, cartCount, cartTotal, checkout
// =============================================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { authService } from "@/services/authService";
import { cartService } from "@/services/cartService";
import { orderService, Order } from "@/services/orderService";

export interface CartItem {
  cartItemId: string; // unique ID: productId + variants
  productId: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  quantity: number;
  thickness?: string;
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  backendCartId: string | null;
  checkout: (details: {
    address: string;
    phoneNumber: string;
    expectedDeliveryDate?: string;
    expectedDeliveryTime?: string;
  }) => Promise<Order>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [backendCartId, setBackendCartId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Sync with backend when user is logged in, or load from localStorage
  const syncWithBackend = useCallback(async () => {
    const user = authService.getCurrentUser();
    const userId = user?.id || user?._id;

    if (userId) {
      try {
        const backendCart = await cartService.getCart(userId);
        if (backendCart) {
          setBackendCartId(backendCart._id);
          if (Array.isArray(backendCart.items) && backendCart.items.length > 0) {
            const mappedItems: CartItem[] = backendCart.items.map((it) => {
              const prod = typeof it.productId === "object" ? it.productId : null;
              const prodId = prod?._id || it.productId || "";
              const prodName = prod?.name || "Product";
              const prodPrice = it.price || prod?.price || 0;
              const prodImage = prod?.images?.[0] || "/plywood.avif";

              return {
                cartItemId: `${prodId}-${it.thickness || "none"}-${it.size || "none"}`,
                productId: String(prodId),
                name: prodName,
                price: prodPrice,
                mrp: prod?.mrp || prodPrice,
                image: prodImage,
                quantity: it.quantity || 1,
                thickness: it.thickness,
                size: it.size,
              };
            });
            setCartItems(mappedItems);
            return;
          }
        }
      } catch (err) {
        console.warn("Backend cart fetch failed, using local storage:", err);
      }
    }

    // Local storage fallback
    try {
      const stored = localStorage.getItem("woodcraft_cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    }
  }, []);

  useEffect(() => {
    syncWithBackend();
  }, [syncWithBackend]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("woodcraft_cart", JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cartItems]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setToastMessage(null), 300);
    }, 2500);
  }, []);

  const addToCart = useCallback(
    async (item: Omit<CartItem, "cartItemId">) => {
      const cartItemId = `${item.productId}-${item.thickness || "none"}-${item.size || "none"}`;

      setCartItems((prev) => {
        const existingItemIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
        if (existingItemIndex >= 0) {
          const newItems = [...prev];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + item.quantity,
          };
          return newItems;
        } else {
          return [...prev, { ...item, cartItemId }];
        }
      });

      showToast(`Added "${item.name}" to cart`);

      // Sync with backend if user is authenticated
      const user = authService.getCurrentUser();
      const userId = user?.id || user?._id;
      if (userId && item.productId) {
        try {
          const res = await cartService.addItem(userId, {
            productId: item.productId,
            quantity: item.quantity,
            thickness: item.thickness,
            size: item.size,
          });
          if (res?._id) setBackendCartId(res._id);
        } catch (err) {
          console.warn("Backend cart add item error:", err);
        }
      }
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    async (cartItemId: string) => {
      const itemToRemove = cartItems.find((i) => i.cartItemId === cartItemId);
      setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));

      const user = authService.getCurrentUser();
      const userId = user?.id || user?._id;
      if (userId && itemToRemove?.productId) {
        try {
          await cartService.removeItem(userId, itemToRemove.productId, {
            thickness: itemToRemove.thickness,
            size: itemToRemove.size,
          });
        } catch (err) {
          console.warn("Backend cart remove item error:", err);
        }
      }
    },
    [cartItems]
  );

  const updateQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      );

      const item = cartItems.find((i) => i.cartItemId === cartItemId);
      const user = authService.getCurrentUser();
      const userId = user?.id || user?._id;
      if (userId && item?.productId) {
        try {
          await cartService.updateItem(userId, item.productId, {
            quantity,
            thickness: item.thickness,
            size: item.size,
          });
        } catch (err) {
          console.warn("Backend cart update quantity error:", err);
        }
      }
    },
    [cartItems, removeFromCart]
  );

  const clearCart = useCallback(async () => {
    setCartItems([]);
    try {
      localStorage.removeItem("woodcraft_cart");
    } catch {}

    const user = authService.getCurrentUser();
    const userId = user?.id || user?._id;
    if (userId) {
      try {
        await cartService.clearCart(userId);
      } catch (err) {
        console.warn("Backend cart clear error:", err);
      }
    }
  }, []);

  const checkout = useCallback(
    async (details: {
      address: string;
      phoneNumber: string;
      expectedDeliveryDate?: string;
      expectedDeliveryTime?: string;
    }): Promise<Order> => {
      const user = authService.getCurrentUser();
      const userId = user?.id || user?._id;

      if (!userId) {
        throw new Error("Please sign in to place an order.");
      }

      // Ensure backend cart exists
      let cartId = backendCartId;
      if (!cartId) {
        const backendCart = await cartService.getCart(userId);
        cartId = backendCart?._id || null;
      }

      // If backend cart is missing or empty, sync items first
      if (!cartId || cartItems.length > 0) {
        for (const item of cartItems) {
          const res = await cartService.addItem(userId, {
            productId: item.productId,
            quantity: item.quantity,
            thickness: item.thickness,
            size: item.size,
          });
          if (res?._id) cartId = res._id;
        }
      }

      if (!cartId) {
        throw new Error("Unable to create cart for order.");
      }

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const order = await orderService.createOrder({
        userId,
        cartId,
        address: details.address,
        phoneNumber: details.phoneNumber,
        expectedDeliveryDate: details.expectedDeliveryDate,
        expectedDeliveryTime: details.expectedDeliveryTime,
        totalAmount,
      });

      // Clear cart on successful order creation
      setCartItems([]);
      try {
        localStorage.removeItem("woodcraft_cart");
      } catch {}

      return order;
    },
    [backendCartId, cartItems]
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        backendCartId,
        checkout,
      }}
    >
      {children}

      {/* Floating Add-to-Cart Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-[200] max-w-sm rounded-[14px] bg-[var(--ink)] text-white text-sm px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex items-center gap-3 transition-all duration-300 pointer-events-none ${
            toastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
