export interface Question {
  id: number;
  question_text: string;
  question_type: "multiple_choice" | "true_false";
  question_set_id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null | undefined;
  QuestionSetId: number;
  options?: QuestionOption[];
}

export interface QuestionOption {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null | undefined;
  QuestionId: number;
}
