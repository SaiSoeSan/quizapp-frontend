export interface User {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: "student" | "admin";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface UserData {
  name: string;
  role: string;
}
