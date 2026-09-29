"use client";

// =============================================================================
// CartContext — global cart state with localStorage persistence
// Provides: add, remove, updateQuantity, clearCart, cartCount, cartTotal
// Toast notification on add. Drawer open/close state.
// =============================================================================

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("woodcraft_cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    }
  }, []);

  // Save to localStorage when cartItems changes
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
      // Remove message after fade-out animation completes
      setTimeout(() => setToastMessage(null), 300);
    }, 2500);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "cartItemId">) => {
      setCartItems((prev) => {
        // Create unique ID based on product, thickness, and size
        const cartItemId = `${item.productId}-${item.thickness || "none"}-${item.size || "none"}`;
        
        const existingItemIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
        
        if (existingItemIndex >= 0) {
          // Increase quantity if item exists
          const newItems = [...prev];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + item.quantity,
          };
          return newItems;
        } else {
          // Add new item
          return [...prev, { ...item, cartItemId }];
        }
      });
      showToast(`Added "${item.name}" to cart`);
    },
    [showToast]
  );

  const removeFromCart = useCallback((cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
      }}
    >
      {children}
      {/* Toast Notification — uses CSS keyframe for smooth slide-up + fade */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "var(--space-5)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 200,
            background: "var(--color-primary)",
            color: "#fff",
            padding: "var(--space-3) var(--space-6)",
            borderRadius: "var(--radius-full)",
            boxShadow: "var(--shadow-lg)",
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: toastVisible ? 1 : 0,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            animation: toastVisible ? "fadeUp 0.3s ease-out" : "none",
          }}
          role="status"
          aria-live="polite"
        >
          <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span style={{ color: "var(--color-accent)" }}>✓</span>
            {toastMessage}
          </p>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
