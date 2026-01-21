import api from "@/lib/axiosConfig";
import {
  CreateQuestionSetRequest,
  CreateQuestionSetResponse,
  GetQuestionSetByIdResponse,
  UpdateQuestionSetRequest,
  UpdateQuestionSetResponse,
  DeleteQuestionSetResponse,
  GetAllQuestionSetsResponse,
} from "@/types/questionSets";

export const questionSetService = {
  getAll: async (): Promise<GetAllQuestionSetsResponse> => {
    const response = await api.get<GetAllQuestionSetsResponse>(
      "/admin/question-sets",
    );
    return response.data;
  },

  getById: async (id: number): Promise<GetQuestionSetByIdResponse> => {
    const response = await api.get<GetQuestionSetByIdResponse>(
      `/admin/question-sets/${id}`,
    );
    return response.data;
  },

  create: async (
    data: Partial<CreateQuestionSetRequest>,
  ): Promise<CreateQuestionSetResponse> => {
    const response = await api.post<CreateQuestionSetResponse>(
      "/admin/question-sets",
      data,
    );
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<UpdateQuestionSetRequest>,
  ): Promise<UpdateQuestionSetResponse> => {
    const response = await api.put<UpdateQuestionSetResponse>(
      `/admin/question-sets/${id}`,
      data,
    );
    return response.data;
  },

  delete: async (id: number): Promise<DeleteQuestionSetResponse> => {
    const response = await api.delete<DeleteQuestionSetResponse>(
      `/admin/question-sets/${id}`,
    );
    return response.data;
  },
};
