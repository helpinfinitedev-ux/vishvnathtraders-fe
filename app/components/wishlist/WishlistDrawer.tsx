"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";

export function WishlistDrawer() {
  const {
    wishlistItems,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  // Prevent body scroll when open
  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isWishlistOpen) setIsWishlistOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!isWishlistOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
        aria-hidden="true"
      />

      <div 
        className={`fixed top-0 right-0 z-50 h-[100dvh] w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 transform translate-x-0`}
        role="dialog"
        aria-label="Your Wishlist"
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--ivory)]">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-[var(--burgundy)] fill-current" />
            <h2 className="font-serif text-xl font-bold text-[var(--ink)]">Your Wishlist</h2>
            <span className="text-sm text-[var(--ink-soft)] ml-1">({wishlistItems.length})</span>
          </div>
          <button 
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 -mr-2 rounded-full hover:bg-[var(--ivory)] text-[var(--ink-soft)] transition-colors"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-[var(--ink-soft)] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[var(--ivory)] flex items-center justify-center">
                <Heart size={24} className="text-[var(--ink-soft)]" />
              </div>
              <p>Your wishlist is empty</p>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="text-[var(--burgundy)] font-semibold underline underline-offset-4"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {wishlistItems.map((item) => (
                <li key={item.productId} className="flex gap-4 p-3 bg-white rounded-xl border border-[var(--ivory)] relative group">
                  <div className="relative w-20 h-20 bg-[var(--ivory)] rounded-lg overflow-hidden shrink-0">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#f3f4f6] text-[#9ca3af]">
                        <Heart size={16} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <Link 
                      href={`/catalogue/${item.category}/${item.productId}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="font-serif font-semibold text-[var(--ink)] truncate hover:text-[var(--burgundy)] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <div className="font-semibold text-[var(--ink)] mt-2">
                      {formatPrice(item.price)}
                      {item.mrp > item.price && (
                        <span className="text-xs text-[var(--ink-soft)] line-through ml-2 font-normal">
                          {formatPrice(item.mrp)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromWishlist(item.productId)}
                    className="absolute top-2 right-2 p-1.5 rounded bg-white border border-[var(--ivory)] text-[var(--ink-soft)] hover:text-red-600 hover:border-red-200 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="p-5 border-t border-[var(--ivory)] bg-[#fafaf8]">
            <button 
              onClick={clearWishlist}
              className="w-full py-2 text-sm font-semibold text-[var(--ink-soft)] hover:text-red-600 transition-colors mb-3"
            >
              Clear wishlist
            </button>
            <button 
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-3.5 bg-[var(--burgundy)] text-white rounded-xl font-semibold hover:bg-[#52121D] transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </>
  );
}
