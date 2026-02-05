export interface AttemptUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AttemptQuestionSet {
  id: number;
  title: string;
}

export interface Attempt {
  id: number;
  userId: number;
  questionSetId: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  isSubmitted: boolean;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  user: AttemptUser;
  questionSet: AttemptQuestionSet;
}

export interface QuestionSetStats {
  questionSetId: number;
  totalAttempts: number;
  totalQuestions: number;
  averageScore: number;
  questionSet: AttemptQuestionSet;
}

export interface AttemptStatsResponse {
  success: boolean;
  totalAttempts: number;
  recentAttempts: Attempt[];
}

export interface AllAttemptsResponse {
  success: boolean;
  attempts: Attempt[];
  questionSetStats: QuestionSetStats[];
  total: number;
}
