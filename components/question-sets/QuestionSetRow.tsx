"use client";

import Link from "next/link";
import { QuestionSet } from "@/types/questionSets";

interface QuestionSetRowProps {
  questionSet: QuestionSet;
  onDelete: (id: number) => void;
}

const QuestionSetRow = ({ questionSet, onDelete }: QuestionSetRowProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="col-span-4">
        <Link
          href={`/admin/question-sets/${questionSet.id}`}
          className="text-gray-800 text-sm hover:text-red-600"
        >
          {questionSet.title}
        </Link>
        <p className="text-sm text-gray-500 mt-1 md:hidden">
          {questionSet.description.length > 100
            ? `${questionSet.description.substring(0, 100)}...`
            : questionSet.description}
        </p>
      </div>

      <div className="hidden md:block col-span-3">
        <p className="text-sm text-gray-600 truncate">
          {questionSet.description.length > 100
            ? `${questionSet.description.substring(0, 100)}...`
            : questionSet.description}
        </p>
      </div>

      <div className="col-span-2 flex items-center md:justify-center">
        <span className="md:hidden text-gray-500 mr-2">Questions:</span>
        <span className="text-gray-700">{questionSet.questionCount}</span>
      </div>

      <div className="col-span-1 flex items-center md:justify-center">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            questionSet.status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {questionSet.status}
        </span>
      </div>

      <div className="col-span-2 flex items-center md:justify-center gap-2">
        <Link
          href={`/admin/question-sets/${questionSet.id}`}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="View"
        >
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </Link>
        <Link
          href={`/admin/question-sets/${questionSet.id}/edit`}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Edit"
        >
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </Link>
        <button
          onClick={() => onDelete(questionSet.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Delete"
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuestionSetRow;
