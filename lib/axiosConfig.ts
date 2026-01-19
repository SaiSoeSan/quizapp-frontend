import { authService } from "@/services/authService";
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
axiosConfig.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle responses globally
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        authService.logout();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosConfig;
