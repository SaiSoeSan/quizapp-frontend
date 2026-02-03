import api from "@/lib/axiosConfig";
import { User } from "@/types/auth";

export interface UsersResponse {
  success: boolean;
  users: User[];
  total: number;
}

export interface UserResponse {
  success: boolean;
  user: User;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export const userService = {
  getAllStudents: async (): Promise<UsersResponse> => {
    const response = await api.get<UsersResponse>("/admin/users");
    return response.data;
  },

  getUserById: async (id: number): Promise<UserResponse> => {
    const response = await api.get<UserResponse>(`/admin/users/${id}`);
    return response.data;
  },

  updateUser: async (
    id: number,
    data: UpdateUserRequest,
  ): Promise<UserResponse> => {
    const response = await api.put<UserResponse>(`/admin/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<DeleteUserResponse> => {
    const response = await api.delete<DeleteUserResponse>(`/admin/users/${id}`);
    return response.data;
  },

  createStudent: async (data: CreateStudentRequest): Promise<UserResponse> => {
    const response = await api.post<UserResponse>("/admin/users", data);
    return response.data;
  },
};
