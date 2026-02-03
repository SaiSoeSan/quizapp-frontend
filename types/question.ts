export interface Question {
  id: number;
  questionText: string;
  questionType: "multiple_choice" | "true_false";
  questionSetId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null | undefined;
  QuestionSetId: number;
  options?: QuestionOption[];
}

export interface QuestionRequestFormData {
  questionText: string;
  questionType: "multiple_choice" | "true_false";
  options: OptionRequest[];
}

export interface OptionRequest {
  id?: number;
  optionText: string;
  isCorrect: boolean;
}

export interface QuestionOption {
  id: number;
  questionId: number;
  optionText: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null | undefined;
  QuestionId: number;
}
