import Link from "next/link";
import { QuestionSetWithProgress } from "@/types/student";

interface CurrentWeekCardProps {
  currentWeek?: QuestionSetWithProgress;
}

export default function CurrentWeekCard({ currentWeek }: CurrentWeekCardProps) {
  if (!currentWeek) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-md p-6 mb-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm mb-1">
            {currentWeek.progress.status === "in_progress"
              ? "Continue where you left off"
              : "Ready to start"}
          </p>
          <h3 className="text-xl font-bold mb-1">{currentWeek.title}</h3>
          <p className="text-white/80 text-sm">
            {currentWeek.totalQuestions} questions
          </p>
        </div>
        <Link
          href={`/student/question-sets/${currentWeek.id}`}
          className="px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          {currentWeek.progress.status === "in_progress"
            ? "Continue"
            : "Start Learning"}
        </Link>
      </div>
    </div>
  );
}


