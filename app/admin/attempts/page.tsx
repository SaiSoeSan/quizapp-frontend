"use client";

import { useEffect, useState } from "react";
import { Attempt, QuestionSetStats } from "@/types/attempt";
import { attemptService } from "@/services/attemptService";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LoadingSpinner from "@/components/ui/Loading";
import Button from "@/components/ui/Button";

export default function AdminAttemptsPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [questionSetStats, setQuestionSetStats] = useState<QuestionSetStats[]>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestionSet, setSelectedQuestionSet] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSets, setExpandedSets] = useState<Set<number>>(new Set());

  const fetchAttempts = async () => {
    try {
      setLoading(true);
      const response = await attemptService.getAll();
      if (response.success) {
        setAttempts(response.attempts);
        setQuestionSetStats(response.questionSetStats);
      }
    } catch (err) {
      console.error("Error fetching attempts:", err);
      setError("Failed to load attempts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempts();
  }, []);

  // Toggle expanded state for a question set
  const toggleExpanded = (questionSetId: number) => {
    setExpandedSets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionSetId)) {
        newSet.delete(questionSetId);
      } else {
        newSet.add(questionSetId);
      }
      return newSet;
    });
  };

  // Expand all question sets
  const expandAll = () => {
    const allIds = new Set(filteredStats.map((stat) => stat.questionSetId));
    setExpandedSets(allIds);
  };

  // Collapse all question sets
  const collapseAll = () => {
    setExpandedSets(new Set());
  };

  // Filter stats by search term and selected question set
  const filteredStats = questionSetStats.filter((stat) => {
    const quizTitle = stat.questionSet?.title?.toLowerCase() || "";
    const matchesSearch = quizTitle.includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedQuestionSet === "all" ||
      stat.questionSetId.toString() === selectedQuestionSet;
    return matchesSearch && matchesFilter;
  });

  // Get attempts for a specific question set
  const getAttemptsForQuestionSet = (questionSetId: number) => {
    return attempts.filter(
      (attempt) => attempt.questionSetId === questionSetId,
    );
  };

  // Get unique question sets for dropdown
  const uniqueQuestionSets = questionSetStats.map((stat) => stat.questionSet);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 70) return "bg-green-100 text-green-800";
    if (percentage >= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Attempts"
          description="View quiz attempts and statistics by question set."
          backLink={{ text: "Back to Dashboard", href: "/admin/dashboard" }}
        />

        {/* Search Bar and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search question sets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-64">
              <select
                value={selectedQuestionSet}
                onChange={(e) => setSelectedQuestionSet(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Question Sets</option>
                {uniqueQuestionSets.map((qs) => (
                  <option key={qs?.id} value={qs?.id?.toString()}>
                    {qs?.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Collapse All
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold">{filteredStats.length}</span>{" "}
            question set(s) with{" "}
            <span className="font-semibold">{attempts.length}</span> total
            attempts
          </div>
        </div>

        {loading && <LoadingSpinner title="Loading attempts..." />}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="danger" onClick={fetchAttempts}>
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {filteredStats.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
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
                <p className="mt-2 text-gray-500">
                  No question set statistics found.
                </p>
              </div>
            ) : (
              filteredStats.map((stat) => {
                const isExpanded = expandedSets.has(stat.questionSetId);
                const questionSetAttempts = getAttemptsForQuestionSet(
                  stat.questionSetId,
                );

                return (
                  <div
                    key={stat.questionSetId}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    {/* Question Set Header - Clickable */}
                    <button
                      onClick={() => toggleExpanded(stat.questionSetId)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Expand/Collapse Icon */}
                        <div
                          className={`transition-transform duration-200 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>

                        {/* Question Set Icon */}
                        <div className="shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-red-600"
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

                        {/* Question Set Title */}
                        <div className="text-left">
                          <h3 className="text-lg font-medium text-gray-900">
                            {stat.questionSet?.title || "Unknown Quiz"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {stat.totalQuestions} questions
                          </p>
                        </div>
                      </div>

                      {/* Stats Badges */}
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                            {stat.totalAttempts} attempts
                          </span>
                        </div>
                        <div className="text-center">
                          <span
                            className={`px-3 py-1 text-sm font-semibold rounded-full ${getScoreColor(
                              stat.averageScore,
                            )}`}
                          >
                            Avg: {stat.averageScore}%
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content - Attempts Table */}
                    {isExpanded && (
                      <div className="border-t border-gray-200">
                        <AttemptsTable
                          attempts={questionSetAttempts}
                          formatDate={formatDate}
                          getScoreColor={getScoreColor}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Separate component for the attempts table within each expanded question set
function AttemptsTable({
  attempts,
  formatDate,
  getScoreColor,
}: {
  attempts: Attempt[];
  formatDate: (date: string) => string;
  getScoreColor: (percentage: number) => string;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAttempts = attempts.filter((attempt) => {
    const studentName =
      `${attempt.user?.firstName} ${attempt.user?.lastName}`.toLowerCase();
    const email = attempt.user?.email?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return studentName.includes(search) || email.includes(search);
  });

  return (
    <div className="px-6 py-4 bg-gray-50">
      {/* Search within attempts */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredAttempts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <svg
            className="mx-auto h-8 w-8 text-gray-400"
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
          <p className="mt-2 text-sm">No attempts found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="pb-3">Student</th>
                <th className="pb-3 text-center">Score</th>
                <th className="pb-3">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAttempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-gray-100">
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {attempt.user?.firstName?.charAt(0) || "?"}
                          {attempt.user?.lastName?.charAt(0) || ""}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {attempt.user?.firstName} {attempt.user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {attempt.user?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getScoreColor(
                        attempt.percentage,
                      )}`}
                    >
                      {attempt.score}/{attempt.totalQuestions} (
                      {attempt.percentage}%)
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-500">
                    {attempt.submittedAt
                      ? formatDate(attempt.submittedAt)
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
