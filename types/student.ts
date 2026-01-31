export interface StudentProgress {
  questionSetId: number;
  status: "locked" | "available" | "in_progress" | "completed";
  score?: number;
  totalQuestions?: number;
  attemptId?: number;
  completedAt?: string;
}

export interface QuestionSetWithProgress {
  id: number;
  title: string;
  description: string;
  sortOrder: number;
  totalQuestions: number;
  youtubeLink?: string | null | undefined;
  progress: StudentProgress;
}

export interface QuizAttempt {
  id: number;
  questionSetId: number;
  userId: number;
  status: "in_progress" | "submitted";
  score?: number;
  totalQuestions: number;
  startedAt: string;
  submittedAt?: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  questionId: number;
  selectedOptionId: number | null;
}

export interface QuizResult {
  attemptId: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  answers: QuizAnswerResult[];
  questionSet: {
    id: number;
    title: string;
  };
}

export interface QuizAnswerResult {
  questionId: number;
  questionText: string;
  questionType: string;
  selectedOptionId: number | null;
  correctOptionId: number;
  isCorrect: boolean;
  options: {
    id: number;
    text: string;
    isCorrect: boolean;
  }[];
}

export interface StudentStats {
  completedQuizzes: number;
  totalQuizzes: number;
  averageScore: number;
  currentStreak: number;
}

export interface StudentActivity {
  id: number;
  type: "completed" | "started";
  title: string;
  score?: number;
  date: string;
}

export interface StudentDashboardResponse {
  stats: StudentStats;
  questionSets: QuestionSetWithProgress[];
}
