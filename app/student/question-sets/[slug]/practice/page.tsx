"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { studentService } from "@/services/studentService";

interface Question {
  id: number;
  questionText: string;
  questionType: string;
  options: Array<{
    id: number;
    optionText: string;
    isCorrect: boolean;
  }>;
}

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionSetTitle, setQuestionSetTitle] = useState("");
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAttempt = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await studentService.getOrCreateAttempt(parseInt(slug));
        setQuestions(data.questions);
        setQuestionSetTitle(data.questionSet.title);
        setAttemptId(data.attempt.id);

        // Load existing answers if any
        if (
          data.existingAnswers &&
          Object.keys(data.existingAnswers).length > 0
        ) {
          setAnswers(data.existingAnswers);
        }
      } catch (err) {
        console.error("Failed to load attempt", err);
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadAttempt();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-gray-500">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-red-600">{error || "No questions found"}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  const handleSelectAnswer = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    if (answeredCount < questions.length) {
      const confirmSubmit = confirm(
        `You have ${questions.length - answeredCount} unanswered question(s). Submit anyway?`,
      );
      if (!confirmSubmit) return;
    }

    if (!attemptId) {
      setError("Attempt ID not found");
      return;
    }

    setSubmitting(true);
    try {
      // Convert answers to API format
      const answersArray = questions.map((q) => ({
        questionId: q.id,
        selectedOptionId: answers[q.id] || null,
      }));

      await studentService.submitQuiz(attemptId, answersArray);

      // Redirect to result page
      router.push(
        `/student/question-sets/${slug}/result?attemptId=${attemptId}`,
      );
    } catch (err) {
      console.error("Failed to submit quiz", err);
      setError("Failed to submit quiz. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">
              Practice: {questionSetTitle}
            </h1>
            <div className="flex items-center gap-4">
              <Button
                variant="danger"
                onClick={handleSubmit}
                loading={submitting}
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span>{answeredCount} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* Question */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                {currentQuestion.questionType === "multiple_choice"
                  ? "Multiple Choice"
                  : "True / False"}
              </span>
            </div>
            <h2 className="text-xl font-medium text-gray-800">
              {currentQuestion.questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() =>
                  handleSelectAnswer(currentQuestion.id, option.id)
                }
                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                  answers[currentQuestion.id] === option.id
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    answers[currentQuestion.id] === option.id
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-700">{option.optionText}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
          >
            ← Previous
          </Button>

          {/* Question Dots */}
          <div className="flex gap-2 flex-wrap justify-center max-w-md">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                  currentIndex === index
                    ? "bg-red-500 text-white ring-2 ring-red-300"
                    : answers[q.id]
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.min(questions.length - 1, prev + 1),
              )
            }
            disabled={currentIndex === questions.length - 1}
          >
            Next →
          </Button>
        </div>

        {/* Quick Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> Click on any question number above to jump
            to that question. Green means answered, gray means unanswered.
          </p>
        </div>
      </div>
    </div>
  );
}
