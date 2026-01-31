"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { QuestionSetWithProgress } from "@/types/student";
import { studentService } from "@/services/studentService";
import LoadingSpinner from "@/components/ui/Loading";
import QuestionSetCard from "@/components/student/QuestionSetCard";

export default function StudentQuestionSetsPage() {
  const [questionSets, setQuestionSets] = useState<QuestionSetWithProgress[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestionSets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await studentService.getQuestionSets();
        setQuestionSets(data);
      } catch (err) {
        console.error("Failed to load question sets", err);
        setError("Failed to load question sets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadQuestionSets();
  }, []);

  const completedCount = questionSets.filter(
    (qs) => qs.progress.status === "completed",
  ).length;

  // if loading state
  if (loading) {
    return <LoadingSpinner title="Loading question sets..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Weekly Lessons"
          description="Complete each week in order to unlock the next one. Watch the video and practice questions to reinforce your learning."
          backLink={{
            href: "/student/dashboard",
            text: "Back to Dashboard",
          }}
        />

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <div className="mt-2">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Your Progress
                </span>
                <span className="text-sm text-gray-500">
                  {completedCount}/{questionSets.length} weeks completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{
                    width: `${questionSets.length > 0 ? (completedCount / questionSets.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Sets List */}
            <div className="space-y-4">
              {questionSets.map((qs, index) => (
                <QuestionSetCard
                  key={qs.id}
                  questionSet={qs}
                  index={index}
                  isLast={index === questionSets.length - 1}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
