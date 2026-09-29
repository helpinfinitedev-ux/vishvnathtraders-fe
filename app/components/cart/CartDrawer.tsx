"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close when pressing Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) setIsCartOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed inset-y-0 right-0 z-[100] w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#f0e8de]">
          <h2 className="font-serif text-xl font-semibold text-[#1c1c1c] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c8956c]" />
            Your Cart ({cartCount})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 -mr-2 text-[#6b7280] hover:text-[#1c1c1c] hover:bg-[#f9f3ec] rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#fafaf8]">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
              <ShoppingBag className="w-16 h-16 text-[#c8956c]" />
              <div>
                <p className="text-lg font-semibold text-[#1c1c1c]">Your cart is empty</p>
                <p className="text-sm text-[#6b7280] mt-1">Looks like you haven't added anything yet.</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 bg-[#c8956c] text-white rounded-full font-medium hover:bg-[#a8744e] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.cartItemId}
                  className="flex gap-4 p-4 bg-white rounded-2xl border border-[#f0e8de] shadow-sm"
                >
                  {/* Item Image */}
                  <div className="w-20 h-24 relative shrink-0 rounded-xl overflow-hidden bg-[#f9f3ec] border border-[#f5ede4]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <Link 
                        href={`/products/${item.productId}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-medium text-[#1c1c1c] text-sm md:text-base leading-snug line-clamp-2 hover:text-[#c8956c] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="p-1 text-[#9ca3af] hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Variants */}
                    {(item.thickness || item.size) && (
                      <p className="text-xs text-[#6b7280] mb-2 truncate">
                        {item.thickness && <span>{item.thickness}</span>}
                        {item.thickness && item.size && <span> • </span>}
                        {item.size && <span>{item.size}</span>}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      <p className="font-semibold text-[#1c1c1c]">
                        {formatPrice(item.price)}
                      </p>
                      
                      {/* Quantity Control */}
                      <div className="flex items-center border border-[#e8ddd4] rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:bg-[#f2e8dc] hover:text-[#1c1c1c] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#1c1c1c]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:bg-[#f2e8dc] hover:text-[#1c1c1c] transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#f0e8de] bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#6b7280] font-medium">Subtotal</span>
              <span className="font-serif text-xl font-bold text-[#1c1c1c]">
                {formatPrice(cartTotal)}
              </span>
            </div>
            
            <p className="text-xs text-[#9ca3af] mb-4 text-center">
              Shipping and taxes calculated at checkout.
            </p>

            <button
              className="w-full bg-[#c8956c] text-white py-4 rounded-xl font-bold tracking-wide uppercase shadow-[0_4px_14px_-2px_rgba(200,149,108,0.35)] hover:bg-[#a8744e] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(200,149,108,0.45)] transition-all duration-200"
              onClick={() => {
                alert("Checkout functionality to be implemented.");
                setIsCartOpen(false);
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
