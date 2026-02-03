"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Button from "@/components/ui/Button";
import { QuestionSetWithProgress } from "@/types/student";
import { studentService } from "@/services/studentService";
import LoadingSpinner from "@/components/ui/Loading";

// Helper to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function QuestionSetViewPage() {
  const params = useParams();
  const id = params.slug as string;

  const [questionSet, setQuestionSet] =
    useState<QuestionSetWithProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestionSet = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await studentService.getQuestionSetById(parseInt(id));
        setQuestionSet(data);
      } catch (err) {
        console.error("Failed to load question set", err);
        setError("Failed to load question set. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadQuestionSet();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner title="Loading question sets..." />;
  }

  if (error || !questionSet) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-red-600">{error || "Question set not found"}</p>
        </div>
      </div>
    );
  }

  const videoId = questionSet.youtubeLink
    ? getYouTubeVideoId(questionSet.youtubeLink)
    : null;

  const { progress } = questionSet;

  const isCompleted = progress.status === "completed";
  const isInProgress = progress.status === "in_progress";
  const isLocked = progress.status === "locked";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title={questionSet.title}
          description={questionSet.description}
          backLink={{
            text: "Back to Question Sets",
            href: "/student/question-sets",
          }}
        />

        {/* Locked Badge */}
        {isLocked && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
              </div>
              <div>
                <p className="font-medium text-gray-800">This week is locked</p>
                <p className="text-sm text-gray-600">
                  Complete previous weeks to unlock this one.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status Badge */}
        {isCompleted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
                <p className="font-medium text-green-800">
                  You&apos;ve completed this week!
                </p>
                <p className="text-sm text-green-600">
                  Your score: {progress.score}%
                </p>
              </div>
            </div>
            <Link
              href={`/student/question-sets/${slug}/result?attemptId=${progress.attemptId}`}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              View Result
            </Link>
          </div>
        )}

        {/* YouTube Video */}
        {videoId && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={questionSet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                📺 Watch the video above before practicing the questions
              </p>
            </div>
          </div>
        )}

        {/* Practice Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
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
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Practice Questions
              </h2>
              <p className="text-gray-500">
                {questionSet.totalQuestions} questions to test your
                understanding
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-800 mb-2">What to expect:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
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
                Multiple choice and true/false questions
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
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
                See your score and correct answers after submission
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
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
                You can retake as many times as you want
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
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
                No time limit - learn at your own pace
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {!isLocked && (
              <Link href={`/student/question-sets/${id}/practice`}>
                <Button variant="danger" size="lg">
                  {isInProgress
                    ? "Continue Practice"
                    : isCompleted
                      ? "Retake Practice"
                      : "Start Practice"}
                </Button>
              </Link>
            )}

            {isCompleted && (
              <Link
                href={`/student/question-sets/${slug}/result?attemptId=${progress.attemptId}`}
              >
                <Button variant="secondary" size="lg">
                  View Last Result
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Study Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• Watch the video completely before attempting questions</li>
            <li>• Take notes while watching the video</li>
            <li>
              • Try to answer all questions without external help initially
            </li>
            <li>• Review the correct answers after each attempt</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
