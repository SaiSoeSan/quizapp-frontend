import api from "@/lib/axiosConfig";
import { QuestionRequestFormData } from "@/types/question";

export const questionService = {
  create: async (questionSetId: number, data: QuestionRequestFormData) => {
    const response = await api.post(
      `/admin/question-sets/${questionSetId}/questions`,
      data,
    );
    return response.data;
  },

  update: async (
    questionSetId: number,
    questionId: number,
    data: QuestionRequestFormData,
  ) => {
    const response = await api.put(
      `/admin/question-sets/${questionSetId}/questions/${questionId}`,
      data,
    );
    return response.data;
  },

  delete: async (questionSetId: number, questionId: number) => {
    const response = await api.delete(
      `/admin/question-sets/${questionSetId}/questions/${questionId}`,
    );
    return response.data;
  },
};
