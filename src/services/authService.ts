import { api, setAuthToken } from "./api";

export interface UserProfile {
  id: string;
  _id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress?: string | null;
  address?: string;
  role: "admin" | "customer" | "deliveryPartner" | "driver" | "standard" | "manager";
  accessPages?: string[];
  totalPurchaseAmount?: number;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
}

export interface SignInCredentials {
  phoneNumber: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  password: string;
  emailAddress?: string;
}

export const authService = {
  /**
   * Login with phone number and password via POST /auth/sign-in
   */
  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>("/auth/sign-in", credentials);
    if (data.token) {
      setAuthToken(data.token);
      if (typeof window !== "undefined") {
        localStorage.setItem("woodcraft_user", JSON.stringify(data.user));
      }
    }
    return data;
  },

  /**
   * Register a new user via POST /auth/register
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>("/auth/register", credentials);
    if (data.token) {
      setAuthToken(data.token);
      if (typeof window !== "undefined") {
        localStorage.setItem("woodcraft_user", JSON.stringify(data.user));
      }
    }
    return data;
  },

  /**
   * Request password reset token via POST /auth/forgot-password
   */
  async forgotPassword(phoneNumber: string): Promise<{ resetToken: string; expiresAt: string }> {
    return api.post<{ resetToken: string; expiresAt: string }>("/auth/forgot-password", {
      phoneNumber,
    });
  },

  /**
   * Reset password with token via POST /auth/reset-password
   */
  async resetPassword(phoneNumber: string, resetToken: string, newPassword: string): Promise<any> {
    return api.post("/auth/reset-password", {
      phoneNumber,
      resetToken,
      newPassword,
    });
  },

  /**
   * Logout user and clear local token/profile
   */
  logout(): void {
    setAuthToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("woodcraft_user");
    }
  },

  /**
   * Get stored user profile from localStorage
   */
  getCurrentUser(): UserProfile | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("woodcraft_user");
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },
};
