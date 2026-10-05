"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Heart, X, Trash2, MessageCircle, Package } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { SITE_CONFIG } from "@/data/siteConfig";

const CSS = `
.wl-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(42,26,29,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 200ms ease;
}
.wl-dialog {
  position: relative;
  background: #fff;
  border-radius: 28px;
  padding: 32px;
  width: min(580px, 100% - 32px);
  max-height: calc(100vh - 48px);
  box-shadow: 0 40px 90px -20px rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  transition: transform 200ms ease;
  transform: translateY(0);
}
@media (prefers-reduced-motion: no-preference) {
  .wl-overlay.wl-entering {
    opacity: 0;
  }
  .wl-overlay.wl-entering .wl-dialog {
    transform: translateY(12px);
  }
}
.wl-dialog button {
  font: inherit;
  outline: none;
}
.wl-dialog button:focus-visible, .wl-dialog a:focus-visible {
  outline: 3px solid rgba(111,23,38,.4);
  outline-offset: 2px;
}
.wl-header {
  padding-bottom: 22px;
  border-bottom: 1px solid #EADFCB;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-shrink: 0;
}
.wl-icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #EFE4D2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.wl-title-block {
  flex: 1;
  min-width: 0;
}
.wl-title {
  font-family: inherit;
  font-size: 38px;
  font-weight: 700;
  color: #52121D;
  line-height: 1;
  margin: 0;
}
.wl-count {
  font-size: 14px;
  color: #6B5A55;
  margin: 4px 0 0 0;
}
.wl-close {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #D8C3A5;
  color: #52121D;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
}
.wl-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
}
.wl-list::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
.wl-item {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid #F0E8DA;
  max-height: 150px;
  opacity: 1;
  overflow: hidden;
}
@media (prefers-reduced-motion: no-preference) {
  .wl-item {
    transition: all 200ms ease;
  }
}
.wl-item:last-child {
  border-bottom: none;
}
.wl-item.wl-removing {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  border-bottom-color: transparent;
}
.wl-item-img-wrap {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(135deg, #F3E9DA, #E2D0B3);
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wl-item-img {
  object-fit: contain;
}
.wl-item-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.wl-item-cat {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: #6F1726;
  margin: 0;
}
.wl-item-name {
  font-family: inherit;
  font-size: 24px;
  font-weight: 700;
  color: #52121D;
  line-height: 1.05;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
}
.wl-item-name:hover {
  text-decoration: underline;
}
.wl-item-price {
  font-size: 14px;
  color: #6B5A55;
  margin: 0;
}
.wl-item-remove {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #D8C3A5;
  color: #52121D;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
}
.wl-footer {
  padding-top: 22px;
  border-top: 1px solid #EADFCB;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  flex-wrap: wrap;
}
.wl-clear {
  color: #6F1726;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  min-height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.wl-enquire {
  height: 52px;
  padding: 0 28px;
  background: #6F1726;
  color: #F7F1E7;
  font-size: 15px;
  font-weight: 700;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.wl-enquire:hover {
  background: #52121D;
}
.wl-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0;
}
.wl-empty-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #EFE4D2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: #6F1726;
}
.wl-empty-title {
  font-family: inherit;
  font-size: 30px;
  color: #52121D;
  font-weight: 700;
  margin: 0 0 8px 0;
}
.wl-empty-desc {
  font-size: 14px;
  color: #6B5A55;
  margin: 0 0 24px 0;
}
.wl-browse {
  height: 52px;
  padding: 0 28px;
  background: #6F1726;
  color: #F7F1E7;
  font-size: 15px;
  font-weight: 700;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.wl-browse:hover {
  background: #52121D;
}
.wl-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (max-width: 639px) {
  .wl-dialog {
    width: calc(100% - 24px);
    padding: 20px;
  }
  .wl-title {
    font-size: 32px;
  }
  .wl-item-img-wrap {
    width: 60px;
    height: 60px;
  }
  .wl-item-name {
    font-size: 22px;
  }
  .wl-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .wl-enquire {
    width: 100%;
  }
  .wl-clear {
    text-align: center;
  }
}
`;

export function WishlistModal() {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, removeFromWishlist, clearWishlist } = useWishlist();
  
  const [isClient, setIsClient] = useState(false);
  const [announceMsg, setAnnounceMsg] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Animations & mounting
  const [animating, setAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isWishlistOpen) {
      triggerElementRef.current = document.activeElement as HTMLElement;
      setMounted(true);
      setAnimating(true);
      document.body.style.overflow = "hidden";
      // Auto focus on open
      setTimeout(() => {
        setAnimating(false);
        closeBtnRef.current?.focus();
      }, 50);
    } else {
      setAnimating(true);
      const t = setTimeout(() => {
        setMounted(false);
        setAnimating(false);
        if (triggerElementRef.current) {
          triggerElementRef.current.focus();
        }
      }, 200);
      document.body.style.overflow = "";
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isWishlistOpen]);
  
  // Trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isWishlistOpen) {
        setIsWishlistOpen(false);
        return;
      }
      
      if (e.key === "Tab" && isWishlistOpen && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!isClient || !mounted) return null;

  const count = wishlistItems.length;
  const countText = count === 1 ? "1 saved product" : `${count} saved products`;

  const handleClearAll = () => {
    clearWishlist();
    setAnnounceMsg("Wishlist cleared");
  };

  const handleRemove = (productId: string, name: string) => {
    setRemovingId(productId);
    setAnnounceMsg(`Removed ${name}`);
    setTimeout(() => {
      removeFromWishlist(productId);
      setRemovingId(null);
    }, 200);
  };
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsWishlistOpen(false);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };
  
  const getEnquiryHref = () => {
    let msg = "Hello WoodCraft, I would like to enquire about: ";
    const names = wishlistItems.map((item, i) => `${i + 1}. ${item.name}`);
    msg += names.join(" ");
    return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  const modalContent = (
    <div className={`wl-overlay ${animating ? "wl-entering" : ""}`} onClick={handleBackdropClick}>
      <style>{CSS}</style>
      <div 
        className="wl-dialog font-serif" 
        role="dialog"
        aria-modal="true"
        aria-labelledby="wl-title"
        ref={dialogRef}
      >
        <div className="wl-header">
          <div className="wl-icon-circle">
            <Heart size={22} fill="#6F1726" stroke="#6F1726" aria-hidden="true" />
          </div>
          <div className="wl-title-block">
            <h2 id="wl-title" className="wl-title">Your wishlist</h2>
            <p className="wl-count font-sans">{countText}</p>
          </div>
          <button 
            ref={closeBtnRef}
            className="wl-close" 
            aria-label="Close wishlist" 
            onClick={() => setIsWishlistOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {count === 0 ? (
          <div className="wl-empty font-sans">
            <div className="wl-empty-icon">
              <Heart size={32} strokeWidth={2} aria-hidden="true" />
            </div>
            <h3 className="wl-empty-title font-serif">Your wishlist is empty</h3>
            <p className="wl-empty-desc">Tap the heart on any product to save it here.</p>
            <Link 
              href="/products" 
              className="wl-browse" 
              onClick={() => setIsWishlistOpen(false)}
            >
              Browse catalogue
            </Link>
          </div>
        ) : (
          <>
            <ul className="wl-list font-sans">
              {wishlistItems.map((item) => (
                <li key={item.productId} className={`wl-item ${removingId === item.productId ? "wl-removing" : ""}`}>
                  <div className="wl-item-img-wrap">
                    {item.image ? (
                      <Image 
                        src={item.image}
                        alt="" 
                        fill
                        className="wl-item-img"
                        sizes="72px"
                        onError={(e) => {
                           e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div style={{ zIndex: -1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', inset: 0, color: '#52121D' }}>
                      <Package size={24} opacity={0.6} aria-hidden="true" />
                    </div>
                  </div>
                  
                  <div className="wl-item-text">
                    <p className="wl-item-cat">{item.category}</p>
                    <Link 
                      href={`/products/${item.productId}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="wl-item-name font-serif"
                    >
                      {item.name}
                    </Link>
                    <p className="wl-item-price">
                      {item.price > 0 ? `${formatCurrency(item.price)} · Excl. GST` : "Price on enquiry"}
                    </p>
                  </div>

                  <button 
                    className="wl-item-remove"
                    aria-label={`Remove ${item.name} from wishlist`}
                    onClick={() => handleRemove(item.productId, item.name)}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="wl-footer font-sans">
              <button 
                className="wl-clear" 
                onClick={handleClearAll}
              >
                Clear all
              </button>
              <a 
                href={getEnquiryHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="wl-enquire"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Enquire about all {count}
              </a>
            </div>
          </>
        )}
        
        <div className="wl-sr-only" role="status" aria-live="polite">
          {announceMsg}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
