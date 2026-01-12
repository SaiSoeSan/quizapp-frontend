import api from "@/lib/axiosConfig";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "@/types/auth";

// Set cookies
const setCookies = (name: string, value: string, days: number = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; HttpOnly, secure, SameSite=strict`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const getCookie = (name: string): string | null => {
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
    deleteCookie("token");
    deleteCookie("user");
    window.location.href = "/login";
  },

  getToken: (): string | null => {
    return getCookie("token");
  },

  setToken: (token: string) => {
    setCookies("token", token);
  },

  setUser: (user: User) => {
    const userData = {
      name: user.first_name + " " + user.last_name,
      role: user.role,
    };
    setCookies("user", JSON.stringify(userData));
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
