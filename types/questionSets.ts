import { Question } from "@/types/question";

export interface FormData {
  title: string;
  description: string;
  youtubeLink: string;
  status: "active" | "draft";
}

export interface QuestionSet {
  id: number;
  title: string;
  description: string;
  youtubeLink?: string | null | undefined;
  status: "active" | "draft";
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null | undefined;
  questionCount?: number;
  questions?: Question[];
}

export interface GetAllQuestionSetsResponse {
  success: boolean;
  questionSets: QuestionSet[];
}

export interface GetQuestionSetByIdResponse {
  success: boolean;
  questionSet: QuestionSet;
}

export interface CreateQuestionSetRequest {
  title: string;
  description?: string;
  youtubeLink?: string | null | undefined;
  status?: "active" | "draft";
}

export interface CreateQuestionSetResponse {
  success: boolean;
  message: string;
  questionSet?: QuestionSet;
  error?: string;
}

export interface UpdateQuestionSetRequest {
  title?: string;
  description?: string;
  youtubeLink?: string | null | undefined;
  status?: "active" | "draft";
}

export interface DeleteQuestionSetResponse {
  success: boolean;
  message: string;
}

export interface UpdateQuestionSetResponse {
  success: boolean;
  message: string;
  questionSet?: QuestionSet;
  error?: string;
}
