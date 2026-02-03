import api from "@/lib/axiosConfig";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
  UserData,
} from "@/types/auth";

const isBrowser = typeof window !== "undefined";

// Set cookies
const setCookies = (name: string, value: string, days: number = 7) => {
  if (!isBrowser) return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; expires=${expires}; path=/;`;
};

const deleteCookie = (name: string) => {
  if (!isBrowser) return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const getCookie = (name: string): string | null => {
  if (!isBrowser) return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()!.split(";")[0]);
  }
  return null;
};

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>("/auth/register", data);
    return response.data;
  },

  logout: () => {
    if (!isBrowser) return;
    deleteCookie("token");
    deleteCookie("user");
  },

  getToken: (): string | null => {
    return getCookie("token");
  },

  setToken: (token: string) => {
    setCookies("token", token);
  },

  setUser: (user: User) => {
    const userData = {
      name: user.firstName + " " + user.lastName,
      role: user.role,
    };
    setCookies("user", JSON.stringify(userData));
  },

  getUser: (): UserData | null => {
    const user = getCookie("user");
    if (user) {
      try {
        return JSON.parse(user);
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    const token = getCookie("token");
    return !!token;
  },

  getRole: (): string | null => {
    const user = getCookie("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.role;
      } catch {
        return null;
      }
    }
    return null;
  },
};
