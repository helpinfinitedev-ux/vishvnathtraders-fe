"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic, Heart, ShoppingCart, User, ChevronDown, X, Phone, Mail } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SignInModal } from "./SignInModal";

// Check for Web Speech API support
const SpeechRecognition = typeof window !== "undefined" && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

export function SearchAndActions() {
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistItems, setIsWishlistOpen } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (SpeechRecognition && !recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
        setMicError("");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setMicError("Permission denied");
        } else {
          setMicError("Voice search error");
        }
        setTimeout(() => setMicError(""), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListen = () => {
    if (!SpeechRecognition) {
      setMicError("Voice search not supported");
      setTimeout(() => setMicError(""), 3000);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-actions-container" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1.5rem",
      width: "100%",
    }}>
      {/* Contact Info (Phone & Email) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
        className="hide-mobile"
      >
        <a
          href="tel:+919041342334"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 500,
            transition: "opacity 0.2s ease",
          }}
          className="hover-opacity"
        >
          <Phone size={16} />
          <span>+919041342334</span>
        </a>

        <span style={{ color: "#555" }} className="hide-tablet">|</span>

        <a
          href="mailto:singlarishu12345@gmail.com"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 500,
            transition: "opacity 0.2s ease",
          }}
          className="hover-opacity hide-tablet"
        >
          <Mail size={16} />
          <span>singlarishu12345@gmail.com</span>
        </a>
      </div>

      {/* Right Side: Search and Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flex: 1, justifyContent: "flex-end" }} className="search-actions-right">
      
      {/* 1. Warranty Pill */}
      {/* <button

      {/* 2. Consumer Dropdown */}
      {/* <div className="hide-mobile" style={{ position: "relative" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "1px solid #E30613",
            color: "#E30613",
            fontWeight: 700,
            padding: "0.4rem 0.4rem 0.4rem 1rem",
            borderRadius: "9999px",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Consumer
          <div style={{
            background: "#222",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff"
          }}>
            <ChevronDown size={14} strokeWidth={3} />
          </div>
        </button>
      </div> */}

      {/* 3. Search Bar */}
      <div className="search-bar-wrapper" style={{
        display: "flex",
        alignItems: "center",
        background: "#f5f5f5",
        border: "1px solid #e0e0e0",
        borderRadius: "9999px",
        padding: "0.25rem 1rem",
        flex: "1",
        maxWidth: "500px",
        position: "relative",
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Listening..." : "What are you looking for?"}
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            width: "100%",
            fontSize: "0.9rem",
            color: "#333",
            padding: "0.5rem 0",
          }}
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            style={{ background: "none", border: "none", color: "#999", cursor: "pointer", display: "flex", alignItems: "center", padding: "0 0.25rem" }}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        <button
          onClick={() => handleSearch()}
          style={{ background: "none", border: "none", color: "#555", cursor: "pointer", display: "flex", alignItems: "center", padding: "0 0.5rem" }}
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        <div style={{ width: "1px", height: "24px", background: "#ddd", margin: "0 0.25rem" }} />

        <div style={{ position: "relative" }}>
          <button
            onClick={toggleListen}
            style={{
              background: "none",
              border: "none",
              color: isListening ? "#E30613" : "#2F80ED",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "0 0.25rem 0 0.5rem",
              transition: "color 0.2s",
            }}
            aria-label="Voice search"
            title="Voice search"
          >
            <Mic size={18} className={isListening ? "pulse-animation" : ""} />
          </button>
          {micError && (
            <div role="alert" style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "0.5rem",
              background: "#333",
              color: "#fff",
              fontSize: "0.75rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              zIndex: 10,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}>
              {micError}
            </div>
          )}
        </div>
      </div>

      {/* 4. Icons Group */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }} className="icons-group">
        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          aria-label={`Wishlist (${wishlistItems.length} items)`}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: "0.2rem" }}
        >
          <Heart size={22} strokeWidth={1.5} />
          {wishlistItems.length > 0 && (
            <span aria-hidden="true" style={{
              position: "absolute",
              top: "-4px",
              right: "-6px",
              background: "#E30613",
              color: "#fff",
              fontSize: "0.65rem",
              fontWeight: 700,
              minWidth: "18px",
              height: "18px",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}>
              {wishlistItems.length}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label={`Shopping Cart with ${cartCount} items`}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: "0.2rem" }}
        >
          <ShoppingCart size={22} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span aria-hidden="true" style={{
              position: "absolute",
              top: "-4px",
              right: "-6px",
              background: "#E30613",
              color: "#fff",
              fontSize: "0.65rem",
              fontWeight: 700,
              minWidth: "18px",
              height: "18px",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}>
              {cartCount}
            </span>
          )}
        </button>

        {/* User */}
        <button
          onClick={() => setIsSignInOpen(true)}
          aria-label="Sign in"
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", padding: "0.2rem" }}
        >
          <User size={22} strokeWidth={1.5} />
        </button>
      </div>

        <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hover-opacity:hover {
          opacity: 0.8;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pulse-animation {
          animation: pulse 1s infinite;
        }
        @media (max-width: 1024px) {
          .hide-tablet {
            display: none !important;
          }
          .search-bar-wrapper {
            max-width: 300px !important;
          }
        }
        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }
          .search-actions-container {
            flex-wrap: wrap;
            gap: 1rem !important;
            justify-content: space-between !important;
          }
          .search-bar-wrapper {
            order: 3;
            max-width: 100% !important;
            min-width: 100%;
          }
          .icons-group {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}
