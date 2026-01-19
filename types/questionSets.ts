export interface QuestionSet {
  id: number;
  title: string;
  description: string;
  youtube_link?: string | null | undefined;
  status: "active" | "draft";
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null | undefined;
  questionCount: number;
}

export interface GetAllQuestionSetsResponse {
  success: boolean;
  questionSets: QuestionSet[];
}

export interface CreateQuestionSetRequest {
  title: string;
  description?: string;
  youtube_link?: string | null | undefined;
  status?: "active" | "draft";
}

export interface UpdateQuestionSetRequest {
  title?: string;
  description?: string;
  youtube_link?: string | null | undefined;
  status?: "active" | "draft";
}
