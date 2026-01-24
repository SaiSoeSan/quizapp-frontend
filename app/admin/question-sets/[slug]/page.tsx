"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LoadingSpinner from "@/components/ui/Loading";
import { questionSetService } from "@/services/questionSetService";
import { QuestionSet } from "@/types/questionSets";
import { Question } from "@/types/question";
import QuestionCard from "@/components/questions/QuestionCard";

const QuestionSetViewPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [questionSet, setQuestionSet] = useState<QuestionSet | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await questionSetService.getById(Number(slug));
      const questionSet = response.questionSet;
      const questions = response.questionSet.questions || [];
      setQuestionSet(questionSet);
      setQuestions(questions);
      setTotalQuestions(questions.length);
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return <LoadingSpinner title="Loading question set..." />;
  }

  if (!questionSet) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Question set not found.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Question Set Details"
          description="View and manage the details of this question set."
          backLink={{
            text: "Back to Question Sets",
            href: "/admin/question-sets",
          }}
        >
          {questionSet.status === "draft" ? (
            <div className="flex gap-2">
              <Button
                as="link"
                href={`/admin/question-sets/${slug}/questions/create`}
                variant="danger"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Question
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Editing is disabled while question set is active</span>
            </div>
          )}
        </DashboardHeader>

        {/* Question Set Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* Header with Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">
                {questionSet.title}
              </h1>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  questionSet.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {questionSet.status}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{questionSet.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="text-xl font-semibold text-gray-800">
                {totalQuestions}
              </p>
            </div>
          </div>

          {/* YouTube Link */}
          {questionSet.youtube_link && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-1">YouTube Link</p>
              <a
                href={questionSet.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                {questionSet.youtube_link}
              </a>
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
            <span className="text-sm text-gray-500">
              {totalQuestions} questions
            </span>
          </div>

          {totalQuestions === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500 mb-4">No questions yet.</p>
              <Button
                as="link"
                href={`/admin/question-sets/${slug}/questions/create`}
                variant="danger"
              >
                Add First Question
              </Button>
            </div>
          ) : (
            questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
                questionSetSlug={slug}
                isEditable={questionSet.status === "draft"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionSetViewPage;
