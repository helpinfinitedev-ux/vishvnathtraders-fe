"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  authService,
  UserProfile,
  SignInCredentials,
  RegisterCredentials,
} from "@/services/authService";
import { getAuthToken } from "@/services/api";

type AuthMode = "signin" | "signup";

interface AuthContextType {
  isOpen: boolean;
  mode: AuthMode;
  openModal: (initialMode?: AuthMode) => void;
  closeModal: () => void;
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  registerUser: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signin");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const savedToken = getAuthToken();
    const savedUser = authService.getCurrentUser();
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }

    const handleUnauthorized = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const openModal = useCallback((initialMode: AuthMode = "signin") => {
    setMode(initialMode);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const signIn = useCallback(
    async (credentials: SignInCredentials) => {
      const res = await authService.signIn(credentials);
      setUser(res.user);
      setToken(res.token);
      closeModal();
    },
    [closeModal]
  );

  const registerUser = useCallback(
    async (credentials: RegisterCredentials) => {
      const res = await authService.register(credentials);
      setUser(res.user);
      setToken(res.token);
      closeModal();
    },
    [closeModal]
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        mode,
        openModal,
        closeModal,
        user,
        token,
        isAuthenticated: Boolean(user && token),
        signIn,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}

export const useAuth = useAuthModal;
