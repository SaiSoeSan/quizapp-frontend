"use client";
import { QuestionSetWithProgress } from "@/types/student";
import Link from "next/link";

const QuestionSetCard = ({
  questionSet,
  index,
  isLast,
}: {
  questionSet: QuestionSetWithProgress;
  index: number;
  isLast: boolean;
}) => {
  const { progress } = questionSet;
  const isLocked = progress.status === "locked";
  const isCompleted = progress.status === "completed";
  const isInProgress = progress.status === "in_progress";
  const isAvailable = progress.status === "available";

  return (
    <div className="relative">
      {/* Connection Line */}
      {!isLast && (
        <div
          className={`absolute left-6 top-20 w-0.5 h-8 ${
            isCompleted ? "bg-green-400" : "bg-gray-200"
          }`}
        />
      )}

      <div
        className={`bg-white rounded-xl shadow-md overflow-hidden ${
          isLocked ? "opacity-60" : ""
        }`}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* Week Number */}
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isInProgress
                    ? "bg-orange-500 text-white"
                    : isAvailable
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-gray-500"
              }`}
            >
              {isCompleted ? (
                <svg
                  className="w-6 h-6"
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
              ) : isLocked ? (
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {questionSet.title}
                </h3>
                {isCompleted && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    Completed
                  </span>
                )}
                {isInProgress && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                    In Progress
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3">
                {questionSet.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Video Lesson
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  {questionSet.totalQuestions} questions
                </span>
                {isCompleted && progress.score !== undefined && (
                  <span className="text-green-600 font-medium">
                    Score: {progress.score}%
                  </span>
                )}
              </div>
            </div>

            {/* Action */}
            <div className="flex-shrink-0">
              {isLocked ? (
                <div className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm">
                  Locked
                </div>
              ) : isCompleted ? (
                <div className="flex gap-2">
                  <Link
                    href={`/student/question-sets/${progress.attemptId}/result`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                  >
                    View Result
                  </Link>
                  <Link
                    href={`/student/question-sets/${questionSet.id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                  >
                    Review
                  </Link>
                </div>
              ) : (
                <Link
                  href={`/student/question-sets/${progress.attemptId}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isInProgress
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {isInProgress ? "Continue" : "Start"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSetCard;
