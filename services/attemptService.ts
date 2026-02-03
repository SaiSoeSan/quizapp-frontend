import api from "@/lib/axiosConfig";
import { AttemptStatsResponse, AllAttemptsResponse } from "@/types/attempt";

export const attemptService = {
  getStats: async (): Promise<AttemptStatsResponse> => {
    const response = await api.get<AttemptStatsResponse>(
      "/admin/attempts/stats",
    );
    return response.data;
  },

  getAll: async (): Promise<AllAttemptsResponse> => {
    const response = await api.get<AllAttemptsResponse>("/admin/attempts");
    return response.data;
  },
};
