"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { StudentStats, QuestionSetWithProgress } from "@/types/student";
import StudentStatsOverview from "@/components/student/StudentStatsOverview";
import CurrentWeekCard from "@/components/student/CurrentWeekCard";
import CompletedWeeksSection from "@/components/student/CompletedWeeksSection";
import { studentService } from "@/services/studentService";
import LoadingSpinner from "@/components/ui/Loading";

export default function StudentDashboard() {
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [questionSets, setQuestionSets] = useState<QuestionSetWithProgress[]>(
    [],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await studentService.getDashboard();
        setStats(data.stats);
        setQuestionSets(data.questionSets);
      } catch (err) {
        console.error("Failed to load student dashboard", err);
        setError("Failed to load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // Calculate progress percentage only when stats are available
  const progressPercentage =
    stats && stats.totalQuizzes > 0
      ? Math.round((stats.completedQuizzes / stats.totalQuizzes) * 100)
      : 0;

  // Find current week (in progress or next available) only when questionSets are loaded
  const currentWeek =
    questionSets.length > 0
      ? questionSets.find(
          (qs) =>
            qs.progress.status === "in_progress" ||
            qs.progress.status === "available",
        )
      : undefined;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Welcome Back!"
          description="Continue your learning journey."
        />

        {loading && <LoadingSpinner title="Loading..." />}

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {stats && (
          <StudentStatsOverview
            stats={stats}
            progressPercentage={progressPercentage}
          />
        )}

        <CurrentWeekCard currentWeek={currentWeek} />

        <div className="grid grid-cols-1 gap-6">
          <CompletedWeeksSection questionSets={questionSets} />
        </div>
      </div>
    </div>
  );
}
