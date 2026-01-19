"use client";
import Link from "next/link";
import { QuestionSet } from "@/types/questionSets";
import QuestionSetRow from "./QuestionSetRow";

interface QuestionSetTableProps {
  questionSets: QuestionSet[];
  onDelete: (id: number) => void;
}

const QuestionSetTable = ({
  questionSets,
  onDelete,
}: QuestionSetTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
        <div className="col-span-4">Name</div>
        <div className="col-span-3">Description</div>
        <div className="col-span-2 text-center">Questions</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>

      {/* Table Body */}
      {questionSets.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {questionSets.map((set) => (
            <QuestionSetRow
              key={set.id}
              questionSet={set}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="px-6 py-12 text-center">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500">No question sets found.</p>
        </div>
      )}
    </div>
  );
};

export default QuestionSetTable;
