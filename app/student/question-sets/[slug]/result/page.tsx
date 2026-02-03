"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { studentService } from "@/services/studentService";
import { QuizResult } from "@/types/student";
import LoadingSpinner from "@/components/ui/Loading";

export default function ResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const attemptId = searchParams.get("attemptId");

  const [result, setResult] = useState<QuizResult | null>(null);
  const [showAnswers, setShowAnswers] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!attemptId) {
          setError("Attempt ID not found. Please complete a practice first.");
          return;
        }

        const data = await studentService.getResult(parseInt(attemptId));
        setResult(data);
      } catch {
        setError("Failed to load result. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (attemptId) {
      loadResult();
    }
  }, [attemptId]);

  if (loading) {
    return <LoadingSpinner title="Loading your practice result..." />;
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {error || "Result not found"}
            </h2>
            <p className="text-gray-600 mb-6">
              The quiz result you&apos;re looking for doesn&apos;t exist or may
              have been removed.
            </p>
            <Link href="/student/question-sets">
              <Button variant="secondary">Back to Question Sets</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isPassed = result.passed;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Practice Result"
          description="Review your answers and learn from your mistakes."
          backLink={{
            text: "Back to Question Sets",
            href: "/student/question-sets",
          }}
        />

        {/* Result Card */}
        <div
          className={`bg-white rounded-xl shadow-md p-8 text-center mb-6 border-t-4 ${
            isPassed ? "border-green-500" : "border-orange-500"
          }`}
        >
          {/* Icon */}
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
              isPassed ? "bg-green-100" : "bg-orange-100"
            }`}
          >
            {isPassed ? (
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-10 h-10 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isPassed ? "Great Job! 🎉" : "Keep Learning! 📚"}
          </h1>
          <p className="text-gray-600 mb-6">
            {isPassed
              ? "You've done well on this practice. Review your answers below."
              : "Don't worry! Review the answers and try again."}
          </p>

          {/* Score */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <div>
              <p className="text-4xl font-bold text-gray-800">
                {result.percentage}%
              </p>
              <p className="text-sm text-gray-500">Score</p>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <p className="text-4xl font-bold text-gray-800">
                {result.correctAnswers}/{result.totalQuestions}
              </p>
              <p className="text-sm text-gray-500">Correct</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              onClick={() => setShowAnswers(!showAnswers)}
            >
              {showAnswers ? "Hide Answers" : "Show Answers"}
            </Button>
            <Link
              href={`/student/question-sets/${result.questionSet.id}/practice`}
            >
              <Button variant="danger">Try Again</Button>
            </Link>
            <Link href="/student/question-sets">
              <Button variant="secondary">Back to List</Button>
            </Link>
          </div>
        </div>

        {/* Answers Review */}
        {showAnswers && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Answer Review
            </h2>

            {result.answers.map((answer, index) => (
              <div
                key={answer.questionId}
                className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                  answer.isCorrect ? "border-green-500" : "border-red-500"
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      answer.isCorrect
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      {answer.questionText}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {answer.questionType === "multiple_choice"
                          ? "Multiple Choice"
                          : "True/False"}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          answer.isCorrect ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="ml-11 space-y-2">
                  {answer.options.map((option, optIndex) => {
                    const isSelected = option.id === answer.selectedOptionId;
                    const isCorrectOption = option.isCorrect;

                    return (
                      <div
                        key={option.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          isCorrectOption
                            ? "border-green-300 bg-green-50"
                            : isSelected && !isCorrectOption
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <span className="flex-shrink-0 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span
                          className={`flex-1 text-sm ${
                            isCorrectOption
                              ? "text-green-700 font-medium"
                              : isSelected
                                ? "text-red-700"
                                : "text-gray-700"
                          }`}
                        >
                          {option.text}
                        </span>

                        {/* Icons */}
                        {isCorrectOption && (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Correct
                          </span>
                        )}
                        {isSelected && !isCorrectOption && (
                          <span className="flex items-center gap-1 text-xs text-red-600">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Your answer
                          </span>
                        )}
                        {isSelected && isCorrectOption && (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Your answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Encouragement */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Learning Tips</h3>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Review the questions you got wrong</li>
            <li>• Re-watch the video if needed</li>
            <li>• Practice makes perfect - try again!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
