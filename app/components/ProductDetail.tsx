"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Heart, Share2, Minus, Plus, X } from "lucide-react";

interface ProductDetailProps {
  name: string;
  brand?: string;
  tag?: string;
  description?: string;
  warranty?: string;
  images?: string[];
  price: number;
  sizes?: string[];
  thicknesses?: string[];
  getPrice?: (selection: any, product: any) => number;
  onAddToCart?: (selection: any) => void;
  cartLabel?: string;
}

const CSS = `
.pd-page * { box-sizing: border-box; }
.pd-page {
  background: #F7F1E7;
  color: #2A1A1D;
  padding: 56px 0 80px;
  font-family: inherit;
}
.pd-w {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 56px;
  align-items: start;
}
.pd-page button {
  font: inherit;
}
.pd-gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.pd-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #fff;
  border-radius: 28px;
  border: 1px solid #EADFCB;
  overflow: hidden;
}
.pd-main-img-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.pd-main-img {
  object-fit: contain;
}
.pd-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #EFE4D2, #F7F1E7);
  color: #52121D;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  padding: 32px;
}
.pd-zoom-pill {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  background: rgba(42, 26, 29, 0.86);
  color: #fff;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.pd-thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.pd-thumb-btn {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #D8C3A5;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  position: relative;
}
.pd-thumb-btn[aria-pressed="true"] {
  border: 2px solid #6F1726;
}
.pd-thumb-img {
  object-fit: cover;
}
.pd-view-1 {
  object-fit: contain;
  filter: none;
}
.pd-view-2 {
  object-fit: contain;
  filter: grayscale(80%) sepia(20%) hue-rotate(180deg) brightness(0.9);
}
.pd-view-3 {
  object-fit: contain;
  filter: sepia(100%) saturate(300%) hue-rotate(340deg) brightness(1.1);
}
.pd-fade-wrapper {
  width: 100%;
  height: 100%;
  animation: pd-fade-in 150ms ease-in-out;
}
@keyframes pd-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.pd-lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(42, 26, 29, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
}
.pd-lightbox-box {
  position: relative;
  width: min(90vw, 820px);
  aspect-ratio: 1 / 1;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pd-lightbox-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #52121D;
  color: #F7F1E7;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.pd-lightbox-img {
  width: 100%;
  height: 100%;
}

.pd-details {
  display: flex;
  flex-direction: column;
}
.pd-eyebrow {
  color: #6F1726;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 10px 0;
}
.pd-h1 {
  color: #52121D;
  font-family: inherit;
  font-size: clamp(2.6rem, 6vw, 4.25rem);
  line-height: 0.98;
  font-weight: 700;
  margin: 0 0 16px 0;
}
.pd-desc {
  color: #4A3A37;
  font-size: 16px;
  line-height: 1.7;
  max-width: 520px;
  margin: 0 0 18px 0;
}
.pd-warranty-pill {
  display: inline-flex;
  background: #EFE4D2;
  color: #6F1726;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 999px;
  margin: 0 0 28px 0;
}
.pd-opt-group {
  margin: 0 0 28px 0;
  border: none;
  padding: 0;
}
.pd-opt-label {
  display: block;
  color: #6B5A55;
  font-size: 15px;
  margin: 0 0 12px 0;
}
.pd-opt-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.pd-opt-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  padding: 0 20px;
  border-radius: 12px;
  border: 1px solid #D8C3A5;
  background: #FFFDF9;
  color: #52121D;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.pd-opt-btn[aria-checked="true"] {
  background: #52121D;
  border-color: #52121D;
  color: #F7F1E7;
}
.pd-stepper {
  display: inline-flex;
  align-items: center;
}
.pd-stepper-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #FFFDF9;
  border: 1px solid #D8C3A5;
  color: #52121D;
  cursor: pointer;
}
.pd-stepper-btn:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.pd-stepper-btn:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
.pd-stepper-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pd-stepper-input {
  width: 60px;
  height: 48px;
  border: none;
  border-top: 1px solid #D8C3A5;
  border-bottom: 1px solid #D8C3A5;
  background: #FFFDF9;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  color: #52121D;
  -moz-appearance: textfield;
}
.pd-stepper-input::-webkit-outer-spin-button,
.pd-stepper-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.pd-price-block {
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid #EADFCB;
}
.pd-price {
  color: #52121D;
  font-size: 44px;
  font-weight: 700;
  font-family: inherit;
  line-height: 1;
  margin: 0;
}
.pd-price-note {
  color: #6F1726;
  font-size: 13px;
  margin: 8px 0 24px 0;
}
.pd-action-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.pd-add-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  min-width: 180px;
  padding: 0 34px;
  background: #6F1726;
  color: #F7F1E7;
  font-size: 16px;
  font-weight: 700;
  border-radius: 999px;
  border: none;
  cursor: pointer;
}
.pd-add-btn:hover { background: #52121D; }
.pd-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #D8C3A5;
  color: #52121D;
  cursor: pointer;
}
.pd-icon-btn:hover { background: #EFE4D2; }
.pd-icon-btn[aria-pressed="true"] {
  background: #6F1726;
  color: #F7F1E7;
  border-color: #6F1726;
}
.pd-status {
  display: block;
  color: #52121D;
  font-size: 13px;
  font-weight: 600;
  margin-top: 8px;
  height: 20px;
}
button:focus-visible, input:focus-visible {
  outline: 3px solid rgba(111, 23, 38, 0.4);
  outline-offset: 2px;
}

@media (max-width: 900px) {
  .pd-w {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .pd-page {
    padding-top: 28px;
  }
  .pd-frame {
    border-radius: 20px;
  }
}
@media (max-width: 640px) {
  .pd-w {
    padding: 0 16px;
  }
}
@media (max-width: 480px) {
  .pd-add-btn {
    width: 100%;
  }
  .pd-price {
    font-size: 38px;
  }
}
`;

export function ProductDetail({
  name,
  brand,
  tag,
  description,
  warranty,
  images = [],
  price,
  sizes = [],
  thicknesses = [],
  getPrice,
  onAddToCart,
  cartLabel = "Add to cart"
}: ProductDetailProps) {
  const [imgError, setImgError] = useState(false);
  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [selectedThickness, setSelectedThickness] = useState(thicknesses[0] || "");
  const [quantity, setQuantity] = useState(1);
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const allImages = images;
  const isSingleImage = allImages.length === 1 && !imgError;
  const showThumbs = !imgError && (isSingleImage ? true : allImages.length > 1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomOpen) {
        setIsZoomOpen(false);
        document.getElementById("pd-zoom-btn")?.focus();
      }
    };
    if (isZoomOpen) {
      window.addEventListener('keydown', handleKey);
      document.getElementById("pd-lightbox-close")?.focus();
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isZoomOpen]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: name,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToastMsg("Link copied");
        setTimeout(() => setToastMsg(""), 2200);
      }
    } catch (err) {
      // ignore
    }
  };

  const currentPrice = getPrice 
    ? getPrice({ size: selectedSize, thickness: selectedThickness, quantity }, { price, sizes, thicknesses })
    : price * quantity;

  return (
    <section className="pd-page">
      <style>{CSS}</style>
      <div className="pd-w">
        
        {/* LEFT: Gallery */}
        <div className="pd-gallery">
          <div className="pd-frame">
            {imgError || allImages.length === 0 ? (
              <div className="pd-fallback">{name}</div>
            ) : (
              <div className="pd-main-img-wrap" key={activeViewIdx}>
                <div className="pd-fade-wrapper">
                  <Image 
                    src={isSingleImage ? allImages[0] : allImages[activeViewIdx]} 
                    alt={name} 
                    fill 
                    priority
                    sizes="(max-width: 900px) 100vw, 600px"
                    className={`pd-main-img ${isSingleImage ? `pd-view-${activeViewIdx + 1}` : ''}`} 
                    onError={() => setImgError(true)}
                  />
                </div>
              </div>
            )}
            {!imgError && allImages.length > 0 && (
              <button 
                id="pd-zoom-btn"
                className="pd-zoom-pill" 
                onClick={() => setIsZoomOpen(true)} 
              >
                <Search size={16} aria-hidden="true" />
                Click to zoom
              </button>
            )}
          </div>
          
          {showThumbs && (
            <div className="pd-thumbs" role="tablist">
              {isSingleImage ? (
                [1, 2, 3].map((viewNum, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-pressed={activeViewIdx === idx}
                    aria-label={`View ${idx + 1} of 3`}
                    className="pd-thumb-btn"
                    onClick={() => setActiveViewIdx(idx)}
                  >
                    <Image src={allImages[0]} alt="" fill className={`pd-thumb-img pd-view-${viewNum}`} />
                  </button>
                ))
              ) : (
                allImages.slice(0, 5).map((img, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-pressed={activeViewIdx === idx}
                    aria-label={`View ${idx + 1} of ${allImages.length}`}
                    className="pd-thumb-btn"
                    onClick={() => setActiveViewIdx(idx)}
                  >
                    <Image src={img} alt="" fill className="pd-thumb-img" />
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Details */}
        <div className="pd-details">
          {(brand || tag) && (
            <p className="pd-eyebrow">
              {[brand, tag].filter(Boolean).join(" · ")}
            </p>
          )}
          <h1 className="pd-h1">{name}</h1>
          
          {description && (
            <p className="pd-desc">{description}</p>
          )}

          {warranty && (
            <div>
              <span className="pd-warranty-pill">{warranty}</span>
            </div>
          )}

          {sizes.length > 0 && (
            <fieldset className="pd-opt-group">
              <legend className="pd-opt-label">Size</legend>
              <div className="pd-opt-list" role="radiogroup">
                {sizes.map((sz) => (
                  <button
                    type="button"
                    key={sz}
                    role="radio"
                    aria-checked={selectedSize === sz}
                    onClick={() => setSelectedSize(sz)}
                    className="pd-opt-btn"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {thicknesses.length > 0 && (
            <fieldset className="pd-opt-group">
              <legend className="pd-opt-label">Thickness</legend>
              <div className="pd-opt-list" role="radiogroup">
                {thicknesses.map((th) => (
                  <button
                    type="button"
                    key={th}
                    role="radio"
                    aria-checked={selectedThickness === th}
                    onClick={() => setSelectedThickness(th)}
                    className="pd-opt-btn"
                  >
                    {th}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="pd-opt-group">
            <span className="pd-opt-label">Quantity</span>
            <div className="pd-stepper">
              <button 
                type="button"
                className="pd-stepper-btn" 
                aria-label="Decrease quantity"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={18} aria-hidden="true" />
              </button>
              <input 
                type="number" 
                className="pd-stepper-input" 
                min={1} 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                aria-label="Quantity"
              />
              <button 
                type="button"
                className="pd-stepper-btn" 
                aria-label="Increase quantity"
                onClick={() => setQuantity(q => q + 1)}
              >
                <Plus size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="pd-price-block">
            <p className="pd-price" aria-live="polite">
              ₹{currentPrice.toLocaleString('en-IN')}
            </p>
            <p className="pd-price-note">Excl. GST. GST applied at checkout.</p>
            
            <div className="pd-action-row">
              <button 
                type="button"
                className="pd-add-btn"
                onClick={() => onAddToCart?.({ size: selectedSize, thickness: selectedThickness, quantity })}
              >
                {cartLabel}
              </button>
              <button 
                type="button"
                className="pd-icon-btn" 
                aria-label="Add to wishlist"
                aria-pressed={isWishlisted}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
              </button>
              <button 
                type="button"
                className="pd-icon-btn" 
                onClick={handleShare} 
                aria-label="Share product"
              >
                <Share2 size={20} aria-hidden="true" />
              </button>
            </div>
            {toastMsg && (
              <span className="pd-status" role="status">
                {toastMsg}
              </span>
            )}
          </div>
        </div>
      </div>

      {isZoomOpen && !imgError && (
        <div className="pd-lightbox" onClick={() => setIsZoomOpen(false)} role="dialog" aria-modal="true">
          <button 
            id="pd-lightbox-close"
            className="pd-lightbox-close" 
            onClick={() => setIsZoomOpen(false)} 
            aria-label="Close zoom"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <div className="pd-lightbox-box" onClick={e => e.stopPropagation()}>
            <Image 
               src={isSingleImage ? allImages[0] : allImages[activeViewIdx]} 
               alt={name} 
               fill
               className={`pd-lightbox-img ${isSingleImage ? `pd-view-${activeViewIdx + 1}` : ''}`} 
            />
          </div>
        </div>
      )}
    </section>
  );
}
