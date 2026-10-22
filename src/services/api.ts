// =============================================================================
// API CLIENT — Centralized fetch wrapper for Vishwanath Traders Backend
// =============================================================================

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  result?: T;
}

export class ApiError extends Error {
  statusCode: number;
  data?: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("woodcraft_token");
};

export const setAuthToken = (token: string | null): void => {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("woodcraft_token", token);
  } else {
    localStorage.removeItem("woodcraft_token");
  }
};

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = res.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");
    const json = isJson ? await res.json() : null;

    if (!res.ok) {
      if (res.status === 401 && typeof window !== "undefined") {
        // Token expired or invalid
        localStorage.removeItem("woodcraft_token");
        localStorage.removeItem("woodcraft_user");
        window.dispatchEvent(new Event("auth:unauthorized"));
      }

      const errorMessage =
        json?.message ||
        (json?.data && typeof json.data === "string" ? json.data : null) ||
        `Request failed with status ${res.status}`;

      throw new ApiError(errorMessage, res.status, json);
    }

    // Backend typically returns { success: true, data: { ... } } or { message, result }
    if (json && typeof json === "object") {
      if ("data" in json) return json.data as T;
      if ("result" in json) return json.result as T;
    }

    return json as T;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;
    console.error(`API request error on ${url}:`, error);
    throw new ApiError(
      error.message || "Network error. Please check your connection.",
      0
    );
  }
}

export const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "GET", headers }),

  post: <T>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    request<T>(endpoint, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers,
    }),

  patch: <T>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers,
    }),

  put: <T>(endpoint: string, body?: any, headers?: Record<string, string>) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers,
    }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, { method: "DELETE", headers }),

  getBaseUrl: () => API_BASE_URL,
};
