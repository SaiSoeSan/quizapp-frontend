import Link from "next/link";
import { Question } from "@/types/question";
import OptionItem from "./OptionItem";

interface QuestionCardProps {
  question: Question;
  index: number;
  questionSetSlug: string;
  isEditable: boolean;
  onDelete?: (questionId: number) => void;
  onEdit?: (question: Question) => void;
}

const QuestionCard = ({
  question,
  index,
  questionSetSlug,
  isEditable,
  onDelete,
  onEdit,
}: QuestionCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Question Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-semibold text-sm">
            {index + 1}
          </span>
          <div>
            <p className="text-gray-800 font-medium">
              {question.question_text}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {question.question_type === "multiple_choice"
                  ? "Multiple Choice"
                  : "True/False"}
              </span>
            </div>
          </div>
        </div>

        {isEditable && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit?.(question)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              title="Edit"
            >
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete?.(question.id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Delete"
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="ml-11 space-y-2">
        {question.options?.map((option, optionIndex) => (
          <OptionItem key={option.id} option={option} index={optionIndex} />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
