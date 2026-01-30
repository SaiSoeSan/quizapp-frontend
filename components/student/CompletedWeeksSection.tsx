import Link from "next/link";
import { QuestionSetWithProgress } from "@/types/student";
import CompletedWeekCard from "./CompletedWeekCard";

interface CompletedWeeksSectionProps {
  questionSets: QuestionSetWithProgress[];
}

export default function CompletedWeeksSection({
  questionSets,
}: CompletedWeeksSectionProps) {
  const completedWeeks = questionSets.filter(
    (qs) => qs.progress.status === "completed",
  );

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Completed Weeks</h2>
        <Link
          href="/student/question-sets"
          className="text-sm text-red-600 hover:text-red-700"
        >
          View all weeks →
        </Link>
      </div>

      <div className="space-y-3">
        {completedWeeks.map((qs) => (
          <CompletedWeekCard key={qs.id} questionSet={qs} />
        ))}

        {completedWeeks.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No completed weeks yet. Start learning!
          </p>
        )}
      </div>
    </div>
  );
}


