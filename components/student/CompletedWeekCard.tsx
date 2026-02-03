import Link from "next/link";
import { QuestionSetWithProgress } from "@/types/student";

interface CompletedWeekCardProps {
  questionSet: QuestionSetWithProgress;
}

export default function CompletedWeekCard({
  questionSet,
}: CompletedWeekCardProps) {
  const { progress } = questionSet;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-green-50 border-green-200">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div>
          <h3 className="font-medium text-gray-800">{questionSet.title}</h3>
          <p className="text-sm text-gray-500">
            {questionSet.totalQuestions} questions
            <span className="ml-2 text-green-600">
              • Score: {progress.score}%
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/student/question-sets/${questionSet.id}/result?attemptId=${questionSet.progress.attemptId}`}
          className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-100 border border-gray-200"
        >
          View Result
        </Link>
        <Link
          href={`/student/question-sets/${questionSet.id}`}
          className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
        >
          Retake
        </Link>
      </div>
    </div>
  );
}
