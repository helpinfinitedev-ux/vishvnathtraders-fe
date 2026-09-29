"use client";

// =============================================================================
// CartDrawer — slide-in cart panel (right side)
// Shows cart items with image, name, price, quantity controls, subtotals,
// empty state, clear-all, and checkout button.
// =============================================================================

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, Minus, Plus } from "lucide-react";
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
        {/* ── Header ────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between border-b border-[#f0e8de]"
          style={{ padding: "var(--space-5) var(--space-6)" }}
        >
          <h2
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--color-primary)",
            }}
          >
            <ShoppingBag
              className="w-5 h-5"
              style={{ color: "var(--color-accent)" }}
            />
            Your Cart ({cartCount})
          </h2>

          <div className="flex items-center gap-3">
            {/* Clear All — only show when there are items */}
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-medium uppercase tracking-wider hover:text-red-500 transition-colors"
                style={{
                  color: "var(--color-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  padding: "4px 8px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Clear All
              </button>
            )}

            {/* Close button */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 -mr-2 text-[#6b7280] hover:text-[#1c1c1c] hover:bg-[#f9f3ec] rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Cart Items Area ───────────────────────────────────────── */}
        <div
          className="flex-1 overflow-y-auto"
          style={{
            padding: "var(--space-5) var(--space-6)",
            background: "var(--color-bg)",
          }}
        >
          {cartItems.length === 0 ? (
            /* ── Empty State ──────────────────────────────────────── */
            <div
              className="flex flex-col items-center justify-center h-full text-center"
              style={{ gap: "var(--space-4)", opacity: 0.8 }}
            >
              <ShoppingBag
                className="w-16 h-16"
                style={{ color: "var(--color-accent)" }}
              />
              <div>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  Your cart is empty
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  Looks like you haven&apos;t added anything yet.
                </p>
              </div>
              <Link
                href="/products"
                onClick={() => setIsCartOpen(false)}
                className="mt-4 inline-flex items-center justify-center font-medium transition-colors"
                style={{
                  padding: "0.625rem 1.5rem",
                  background: "var(--color-accent)",
                  color: "#fff",
                  borderRadius: "var(--radius-full)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            /* ── Item List ─────────────────────────────────────────── */
            <ul
              className="flex flex-col"
              style={{ gap: "var(--space-4)", listStyle: "none", padding: 0, margin: 0 }}
            >
              {cartItems.map((item) => {
                const lineSubtotal = item.price * item.quantity;

                return (
                  <li
                    key={item.cartItemId}
                    className="flex bg-white border border-[#f0e8de]"
                    style={{
                      gap: "var(--space-4)",
                      padding: "var(--space-4)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {/* Item Image — fixed 80×96, aspect preserved */}
                    <div
                      className="relative shrink-0 overflow-hidden"
                      style={{
                        width: "80px",
                        height: "96px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-accent-light)",
                        border: "1px solid #f5ede4",
                      }}
                    >
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
                      {/* Row 1: Name + Remove */}
                      <div
                        className="flex justify-between items-start"
                        style={{ gap: "var(--space-2)", marginBottom: "2px" }}
                      >
                        <Link
                          href={`/products/${item.productId}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-medium leading-snug line-clamp-2 hover:text-[#c8956c] transition-colors"
                          style={{
                            color: "var(--color-primary)",
                            fontSize: "0.875rem",
                            textDecoration: "none",
                          }}
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="p-1 text-[#9ca3af] hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variants */}
                      {(item.thickness || item.size) && (
                        <p
                          className="text-xs truncate"
                          style={{
                            color: "var(--color-muted)",
                            marginBottom: "var(--space-2)",
                          }}
                        >
                          {item.thickness && <span>{item.thickness}</span>}
                          {item.thickness && item.size && <span> • </span>}
                          {item.size && <span>{item.size}</span>}
                        </p>
                      )}

                      {/* Row 3: Price + Quantity — aligned bottom */}
                      <div
                        className="mt-auto flex items-center justify-between"
                        style={{ gap: "var(--space-3)" }}
                      >
                        {/* Price block */}
                        <div className="min-w-0">
                          <p
                            className="font-semibold"
                            style={{ color: "var(--color-primary)", fontSize: "0.9375rem" }}
                          >
                            {formatPrice(item.price)}
                          </p>
                          {/* Show line subtotal when qty > 1 */}
                          {item.quantity > 1 && (
                            <p
                              className="text-xs"
                              style={{ color: "var(--color-muted)", marginTop: "1px" }}
                            >
                              Subtotal: {formatPrice(lineSubtotal)}
                            </p>
                          )}
                        </div>

                        {/* Quantity Control — 40px tap targets on mobile */}
                        <div
                          className="flex items-center overflow-hidden shrink-0"
                          style={{
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius-sm)",
                            background: "#fff",
                          }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="flex items-center justify-center text-[#6b7280] hover:bg-[#f2e8dc] hover:text-[#1c1c1c] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{ width: "36px", height: "36px", minWidth: "40px", minHeight: "40px" }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span
                            className="text-center text-sm font-medium"
                            style={{
                              width: "32px",
                              color: "var(--color-primary)",
                              userSelect: "none",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="flex items-center justify-center text-[#6b7280] hover:bg-[#f2e8dc] hover:text-[#1c1c1c] transition-colors"
                            style={{ width: "36px", height: "36px", minWidth: "40px", minHeight: "40px" }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* ── Footer — Subtotal + Checkout ──────────────────────────── */}
        {cartItems.length > 0 && (
          <div
            className="border-t border-[#f0e8de] bg-white"
            style={{ padding: "var(--space-5) var(--space-6)" }}
          >
            {/* Total */}
            <div
              className="flex justify-between items-center"
              style={{ marginBottom: "var(--space-4)" }}
            >
              <span
                className="font-medium"
                style={{ color: "var(--color-muted)" }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--color-primary)",
                }}
              >
                {formatPrice(cartTotal)}
              </span>
            </div>

            <p
              className="text-xs text-center"
              style={{
                color: "#9ca3af",
                marginBottom: "var(--space-4)",
              }}
            >
              Shipping and taxes calculated at checkout.
            </p>

            {/* Checkout CTA */}
            <button
              className="w-full font-bold tracking-wide uppercase transition-all duration-200"
              style={{
                background: "var(--color-accent)",
                color: "#fff",
                padding: "var(--space-4)",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-heading)",
                fontSize: "0.875rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px -2px rgba(200,149,108,0.35)",
                minHeight: "48px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--color-accent-dark)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 24px -4px rgba(200,149,108,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--color-accent)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 14px -2px rgba(200,149,108,0.35)";
              }}
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
