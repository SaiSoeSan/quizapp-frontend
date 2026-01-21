import api from "@/lib/axiosConfig";
import {
  CreateQuestionSetRequest,
  GetAllQuestionSetsResponse,
  QuestionSet,
} from "@/types/questionSets";

export const questionSetService = {
  getAll: async (): Promise<GetAllQuestionSetsResponse> => {
    const response = await api.get<GetAllQuestionSetsResponse>(
      "/admin/question-sets",
    );
    return response.data;
  },

  getById: async (id: number): Promise<QuestionSet> => {
    const response = await api.get<QuestionSet>(`/admin/question-sets/${id}`);
    return response.data;
  },

  create: async (
    data: Partial<CreateQuestionSetRequest>,
  ): Promise<QuestionSet> => {
    const response = await api.post<QuestionSet>("/admin/question-sets", data);
    return response.data;
  },

  // update: async (
  //   id: number,
  //   data: Partial<UpdateQuestionSetRequest>,
  // ): Promise<QuestionSet> => {
  //   const response = await api.put<QuestionSet>(
  //     `/admin/question-sets/${id}`,
  //     data,
  //   );
  //   return response.data;
  // },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/admin/question-sets/${id}`);
  },
};
