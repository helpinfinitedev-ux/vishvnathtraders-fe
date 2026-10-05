"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Eye, EyeOff, Check } from "lucide-react";
import { useAuthModal } from "@/context/AuthModalContext";

interface AuthModalProps {
  onSignIn?: (email: string, pass: string) => Promise<void>;
  onSignUp?: (name: string, email: string, pass: string) => Promise<void>;
  onGoogle?: () => Promise<void>;
  onResetPassword?: (email: string) => Promise<void>;
}

export function AuthModal({
  onSignIn = async (email, pass) => {
    console.log("Placeholder onSignIn:", email, pass);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com") resolve();
        else reject(new Error("Wrong email or password."));
      }, 1000);
    });
  },
  onSignUp = async (name, email, pass) => {
    console.log("Placeholder onSignUp:", name, email, pass);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
  onResetPassword = async (email) => {
    console.log("Placeholder onResetPassword:", email);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
}: AuthModalProps) {
  const { isOpen, mode, closeModal, openModal } = useAuthModal();
  const [mounted, setMounted] = useState(false);
  const [activeMode, setActiveMode] = useState<"signin" | "signup">(mode);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<{name?: string, email?: string, password?: string}>({});

  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Sync mode changes
  useEffect(() => {
    if (isOpen) {
      setActiveMode(mode);
      setIsResetMode(false);
      setIsSuccess(false);
      setErrorMsg("");
      setValidationErrors({});
      // Keep email, reset password
      setPassword("");
      
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        // Focus first input on open
        if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
          closeBtnRef.current?.focus();
        } else {
          firstInputRef.current?.focus();
        }
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mode]);

  const switchMode = (m: "signin" | "signup") => {
    setActiveMode(m);
    setIsResetMode(false);
    setErrorMsg("");
    setValidationErrors({});
    openModal(m);
  };

  const validate = () => {
    const errs: any = {};
    if (activeMode === "signup" && !isResetMode) {
      if (!name.trim()) errs.name = "Required";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Valid email required";
    }
    if (!isResetMode) {
      if (!password) {
        errs.password = "Required";
      } else if (activeMode === "signup" && password.length < 8) {
        errs.password = "Use at least 8 characters";
      }
    }
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;
    
    setErrorMsg("");
    setLoading(true);

    try {
      if (isResetMode) {
        await onResetPassword(email);
        setIsSuccess(true);
      } else if (activeMode === "signin") {
        await onSignIn(email, password);
        closeModal();
      } else {
        await onSignUp(name, email, password);
        setIsSuccess(true);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="am-overlay"
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div className="am-backdrop" onClick={closeModal} aria-hidden="true" />
      
      <div
        className="am-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="am-heading"
      >
        <div className="am-top-row">
          <div className="am-logo">
            <span>W</span>
          </div>
          <button
            ref={closeBtnRef}
            className="am-close-btn"
            onClick={closeModal}
            aria-label="Close"
          >
            <X size={20} color="#52121D" />
          </button>
        </div>

        {isSuccess && activeMode === "signup" && !isResetMode ? (
          <div className="am-success-state">
            <div className="am-success-icon">
              <Check size={32} color="#6F1726" />
            </div>
            <h2 className="am-heading" style={{ textAlign: "center", marginBottom: "8px" }}>Check your email</h2>
            <p className="am-muted-text" style={{ textAlign: "center", marginBottom: "24px" }}>
              We sent a link to {email}.
            </p>
            <button className="am-text-btn" onClick={() => switchMode("signin")}>
              Back to sign in
            </button>
          </div>
        ) : isSuccess && isResetMode ? (
          <div className="am-success-state">
            <div className="am-success-icon">
              <Check size={32} color="#6F1726" />
            </div>
            <h2 className="am-heading" style={{ textAlign: "center", marginBottom: "8px" }}>Link sent</h2>
            <p className="am-muted-text" style={{ textAlign: "center", marginBottom: "24px" }}>
              We sent a password reset link to {email}.
            </p>
            <button className="am-text-btn" onClick={() => setIsResetMode(false)}>
              Back to sign in
            </button>
          </div>
        ) : (
          <>
            <h2 id="am-heading" className="am-heading">
              {isResetMode ? "Reset password" : activeMode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="am-muted-text" style={{ marginTop: "6px" }}>
              {isResetMode
                ? "Enter your email and we'll send a reset link."
                : activeMode === "signin"
                ? "Sign in to see your wishlist and enquiries."
                : "Save products and track your enquiries."}
            </p>

            {!isResetMode && (
              <div className="am-tabs-track" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeMode === "signin"}
                  className={`am-tab ${activeMode === "signin" ? "am-tab-active" : ""}`}
                  onClick={() => switchMode("signin")}
                >
                  Sign in
                </button>
                <button
                  role="tab"
                  aria-selected={activeMode === "signup"}
                  className={`am-tab ${activeMode === "signup" ? "am-tab-active" : ""}`}
                  onClick={() => switchMode("signup")}
                >
                  Create account
                </button>
              </div>
            )}

            <form className="am-form" noValidate onSubmit={handleSubmit}>
              {errorMsg && (
                <div className="am-error-box" role="alert">
                  {errorMsg}
                </div>
              )}

              {activeMode === "signup" && !isResetMode && (
                <div className="am-field">
                  <label htmlFor="am-name" className="am-label">Full name</label>
                  <input
                    id="am-name"
                    ref={firstInputRef}
                    type="text"
                    autoComplete="name"
                    className="am-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!validationErrors.name}
                    aria-describedby={validationErrors.name ? "am-name-error" : undefined}
                  />
                  {validationErrors.name && (
                    <span id="am-name-error" className="am-field-error">{validationErrors.name}</span>
                  )}
                </div>
              )}

              <div className="am-field">
                <label htmlFor="am-email" className="am-label">Email</label>
                <input
                  id="am-email"
                  ref={activeMode === "signin" || isResetMode ? firstInputRef : null}
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="am-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!validationErrors.email}
                  aria-describedby={validationErrors.email ? "am-email-error" : undefined}
                />
                {validationErrors.email && (
                  <span id="am-email-error" className="am-field-error">{validationErrors.email}</span>
                )}
              </div>

              {!isResetMode && (
                <div className="am-field">
                  <div className="am-label-row">
                    <label htmlFor="am-password" className="am-label" style={{ marginBottom: 0 }}>Password</label>
                    {activeMode === "signin" && (
                      <button
                        type="button"
                        className="am-forgot-btn"
                        onClick={() => {
                          setIsResetMode(true);
                          setErrorMsg("");
                          setValidationErrors({});
                        }}
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="am-input-wrapper">
                    <input
                      id="am-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={activeMode === "signin" ? "current-password" : "new-password"}
                      placeholder="Enter your password"
                      className="am-input am-input-pass"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={!!validationErrors.password}
                      aria-describedby={validationErrors.password ? "am-password-error" : undefined}
                    />
                    <button
                      type="button"
                      className="am-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {validationErrors.password && (
                    <span id="am-password-error" className="am-field-error">{validationErrors.password}</span>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="am-primary-btn"
                disabled={loading}
              >
                {loading
                  ? (isResetMode ? "Sending..." : activeMode === "signin" ? "Signing in..." : "Creating account...")
                  : (isResetMode ? "Send reset link" : activeMode === "signin" ? "Sign in" : "Create account")}
                {loading && <span className="am-spinner"></span>}
              </button>

              {/* Removed Google button and divider as per instructions if no auth exists */}

            </form>

            <div className="am-footer-text">
              {isResetMode ? (
                <button className="am-text-btn" onClick={() => setIsResetMode(false)}>
                  Back to sign in
                </button>
              ) : activeMode === "signup" ? (
                <>
                  <div style={{ fontSize: "12px", marginBottom: "8px" }}>
                    By creating an account you agree to our <a href="/terms" className="am-link" onClick={(e) => e.preventDefault()}>Terms</a> and <a href="/privacy" className="am-link" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                  </div>
                  <div>
                    Already have an account? <button className="am-text-btn" onClick={() => switchMode("signin")}>Sign in</button>
                  </div>
                </>
              ) : (
                <div>
                  New to WoodCraft? <button className="am-text-btn" onClick={() => switchMode("signup")}>Create an account</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style>{`
        button, input { font: inherit; }
        
        .am-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(42,26,29,0.58);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          min-height: 100vh;
          height: 100dvh;
          animation: am-fade 0.2s ease;
        }

        .am-backdrop {
          position: absolute;
          inset: 0;
        }

        .am-dialog {
          position: relative;
          width: min(480px, 100%);
          max-height: calc(100dvh - 24px);
          background: #ffffff;
          border-radius: 28px;
          padding: 36px;
          box-shadow: 0 40px 90px -20px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          animation: am-slide-up 0.2s ease;
        }

        @media (prefers-reduced-motion) {
          .am-overlay, .am-dialog {
            animation: none;
          }
        }

        .am-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .am-logo {
          width: 48px;
          height: 48px;
          background: #6F1726;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F7F1E7;
          font-family: var(--font-heading), sans-serif;
          font-weight: 700;
          font-size: 28px;
        }

        .am-close-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #D8C3A5;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
        }
        
        .am-close-btn:focus-visible {
          outline: 3px solid rgba(111,23,38,0.4);
          outline-offset: 2px;
        }

        .am-heading {
          font-family: var(--font-heading), sans-serif;
          font-weight: 700;
          font-size: 44px;
          line-height: 1;
          color: #52121D;
          margin: 0;
        }

        .am-muted-text {
          font-size: 15px;
          color: #6B5A55;
          margin: 0;
        }

        .am-tabs-track {
          margin-top: 22px;
          background: #EFE4D2;
          padding: 5px;
          border-radius: 9999px;
          display: flex;
        }

        .am-tab {
          flex: 1;
          height: 44px;
          border-radius: 9999px;
          border: none;
          background: transparent;
          color: #52121D;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: background 0.15s, color 0.15s;
        }
        
        .am-tab:focus-visible {
          outline: 3px solid rgba(111,23,38,0.4);
          outline-offset: -2px;
        }

        .am-tab-active {
          background: #6F1726;
          color: #F7F1E7;
          font-weight: 700;
        }

        .am-form {
          margin-top: 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .am-field {
          display: flex;
          flex-direction: column;
        }

        .am-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 7px;
        }

        .am-label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 7px;
        }

        .am-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .am-input {
          width: 100%;
          height: 50px;
          border-radius: 12px;
          border: 1px solid #D8C3A5;
          background: #FFFDF9;
          font-size: 15px;
          color: #2A1A1D;
          padding: 0 16px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .am-input:focus {
          border-color: #6F1726;
          box-shadow: 0 0 0 3px rgba(111,23,38,0.15);
        }

        .am-input[aria-invalid="true"] {
          border-color: #B3261E;
        }
        
        .am-input[aria-invalid="true"]:focus {
          box-shadow: 0 0 0 3px rgba(179,38,30,0.15);
        }

        .am-input-pass {
          padding-right: 48px;
        }

        .am-eye-btn {
          position: absolute;
          right: 2px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #6B5A55;
          border-radius: 10px;
        }
        
        .am-eye-btn:focus-visible {
          outline: 3px solid rgba(111,23,38,0.4);
        }

        .am-forgot-btn {
          font-size: 13px;
          font-weight: 700;
          color: #6F1726;
          text-decoration: underline;
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px 4px;
          border-radius: 4px;
        }

        .am-forgot-btn:focus-visible {
          outline: 3px solid rgba(111,23,38,0.4);
        }

        .am-field-error {
          font-size: 12px;
          color: #B3261E;
          margin-top: 4px;
        }

        .am-error-box {
          background: #FDECEA;
          color: #B3261E;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 14px;
        }

        .am-primary-btn {
          width: 100%;
          height: 52px;
          border-radius: 9999px;
          background: #6F1726;
          color: #F7F1E7;
          font-size: 16px;
          font-weight: 700;
          border: none;
          margin-top: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: background 0.15s;
          outline: none;
        }

        .am-primary-btn:hover:not(:disabled) {
          background: #52121D;
        }

        .am-primary-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .am-primary-btn:focus-visible {
          outline: 3px solid rgba(111,23,38,0.4);
          outline-offset: 2px;
        }

        .am-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(247,241,231,0.3);
          border-radius: 50%;
          border-top-color: #F7F1E7;
          animation: am-spin 0.8s linear infinite;
        }

        .am-footer-text {
          margin-top: 22px;
          text-align: center;
          font-size: 14px;
          color: #6B5A55;
        }

        .am-text-btn {
          font-weight: 700;
          color: #6F1726;
          text-decoration: underline;
          background: none;
          border: none;
          cursor: pointer;
          padding: 2px 4px;
          border-radius: 4px;
        }

        .am-text-btn:focus-visible {
          outline: 3px solid rgba(111,23,38,0.4);
        }

        .am-link {
          color: #6B5A55;
          text-decoration: underline;
          border-radius: 2px;
        }
        
        .am-link:focus-visible {
          outline: 3px solid rgba(111,23,38,0.4);
        }

        .am-success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 32px 0;
        }

        .am-success-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #EFE4D2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        @keyframes am-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes am-slide-up {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes am-spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .am-dialog {
            width: calc(100% - 24px);
            padding: 24px;
            border-radius: 24px;
          }
          .am-heading {
            font-size: 36px;
          }
          .am-logo {
            width: 44px;
            height: 44px;
            font-size: 24px;
          }
          .am-input {
            font-size: 16px; /* prevent iOS zoom */
          }
        }

        @media (max-width: 380px) {
          .am-dialog {
            padding: 20px;
          }
          .am-heading {
            font-size: 32px;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
