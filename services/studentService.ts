import api from "@/lib/axiosConfig";
import {
  QuestionSetWithProgress,
  QuizAttempt,
  QuizAnswer,
  QuizResult,
  StudentStats,
  StudentDashboardResponse,
} from "@/types/student";

export const studentService = {
  // Get full dashboard data (stats + question sets)
  getDashboard: async (): Promise<StudentDashboardResponse> => {
    const response = await api.get<{ data: StudentDashboardResponse }>("/student/dashboard");
    return response.data.data;
  },

  // Get dashboard stats
  getStats: async (): Promise<StudentStats> => {
    const response = await api.get("/student/stats");
    return response.data.stats;
  },

  // Get all question sets with progress
  getQuestionSets: async (): Promise<QuestionSetWithProgress[]> => {
    const response = await api.get<{ data: { questionSets: QuestionSetWithProgress[] } }>(
      "/student/question-sets",
    );
    return response.data.data.questionSets;
  },

  // Get single question set by ID
  getQuestionSetById: async (id: number): Promise<QuestionSetWithProgress> => {
    const response = await api.get<{ data: QuestionSetWithProgress }>(
      `/student/question-sets/${id}`,
    );
    return response.data.data;
  },

  // Get or create attempt for practice (returns questions)
  getOrCreateAttempt: async (questionSetId: number): Promise<{
    attempt: QuizAttempt;
    questionSet: { id: number; title: string };
    questions: Array<{
      id: number;
      question_text: string;
      question_type: string;
      options: Array<{
        id: number;
        option_text: string;
        is_correct: boolean;
      }>;
    }>;
    existingAnswers: Record<number, number>;
  }> => {
    const response = await api.get<{
      data: {
        attempt: QuizAttempt;
        questionSet: { id: number; title: string };
        questions: Array<{
          id: number;
          question_text: string;
          question_type: string;
          options: Array<{
            id: number;
            option_text: string;
            is_correct: boolean;
          }>;
        }>;
        existingAnswers: Record<number, number>;
      };
    }>(`/student/question-sets/${questionSetId}/attempt`);
    return response.data.data;
  },

  // Save draft (auto-save answers)
  saveDraft: async (
    attemptId: number,
    answers: QuizAnswer[],
  ): Promise<void> => {
    await api.put(`/student/attempts/${attemptId}/draft`, { answers });
  },

  // Submit quiz
  submitQuiz: async (
    attemptId: number,
    answers: QuizAnswer[],
  ): Promise<{
    attemptId: number;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
    passed: boolean;
    submittedAt: string;
  }> => {
    const response = await api.post<{
      data: {
        attemptId: number;
        score: number;
        totalQuestions: number;
        correctAnswers: number;
        percentage: number;
        passed: boolean;
        submittedAt: string;
      };
    }>(`/student/attempt/${attemptId}/submit`, {
      answers: answers.map((a) => ({
        question_id: a.questionId,
        selected_option_id: a.selectedOptionId,
      })),
    });
    return response.data.data;
  },

  // Get quiz result
  getResult: async (attemptId: number): Promise<QuizResult> => {
    const response = await api.get<{ data: QuizResult }>(
      `/student/attempt/${attemptId}/result`,
    );
    return response.data.data;
  },

  // Retry quiz (create new attempt)
  retryQuiz: async (questionSetId: number): Promise<QuizAttempt> => {
    const response = await api.post(
      `/student/question-sets/${questionSetId}/retry`,
    );
    return response.data.attempt;
  },
};
