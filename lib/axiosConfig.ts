import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:3000/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosConfig;
