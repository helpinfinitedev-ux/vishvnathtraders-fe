"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (isOpen: boolean) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("woodcraft_wishlist");
      if (stored) {
        setWishlistItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load wishlist from localStorage", err);
    }
  }, []);

  // Save to localStorage when wishlistItems changes
  useEffect(() => {
    try {
      localStorage.setItem("woodcraft_wishlist", JSON.stringify(wishlistItems));
    } catch (err) {
      console.error("Failed to save wishlist to localStorage", err);
    }
  }, [wishlistItems]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setToastMessage(null), 300);
    }, 2500);
  }, []);

  const addToWishlist = useCallback(
    (item: WishlistItem) => {
      setWishlistItems((prev) => {
        if (prev.some(i => i.productId === item.productId)) return prev;
        return [...prev, item];
      });
      showToast(`Added "${item.name}" to wishlist`);
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setWishlistItems((prev) => {
        const item = prev.find(i => i.productId === productId);
        if (item) showToast(`Removed "${item.name}" from wishlist`);
        return prev.filter((i) => i.productId !== productId);
      });
    },
    [showToast]
  );

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.some(i => i.productId === productId);
  }, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isInWishlist
      }}
    >
      {children}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "var(--space-5)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 200,
            background: "#6F1726",
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
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
