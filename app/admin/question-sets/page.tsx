"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/question-sets/SearchBar";
import QuestionSetTable from "@/components/question-sets/QuestionSetTable";
import { QuestionSet } from "@/types/questionSets";
import { questionSetService } from "@/services/questionSetService";

// Static data - replace with API call later
// const initialQuestionSets: QuestionSet[] = [
//   {
//     id: 1,
//     title: "JavaScript Basics",
//     description: "Fundamental JavaScript concepts for beginners",
//     questionsCount: 25,
//     status: "active",
//   },
//   {
//     id: 2,
//     title: "React Fundamentals",
//     description: "Core React concepts including hooks and state management",
//     questionsCount: 30,
//     status: "active",
//   },
//   {
//     id: 3,
//     title: "Node.js Quiz",
//     description: "Server-side JavaScript with Node.js",
//     questionsCount: 20,
//     status: "draft",
//   },
//   {
//     id: 4,
//     title: "TypeScript Advanced",
//     description: "Advanced TypeScript features and patterns",
//     questionsCount: 15,
//     status: "active",
//   },
//   {
//     id: 5,
//     title: "CSS Mastery",
//     description: "Advanced CSS techniques and layouts",
//     questionsCount: 22,
//     status: "active",
//   },
//   {
//     id: 6,
//     title: "Database Design",
//     description: "SQL and NoSQL database concepts",
//     questionsCount: 18,
//     status: "draft",
//   },
// ];

export default function QuestionSetsPage() {
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft">(
    "all",
  );

  const fetchQuestionSets = async () => {
    try {
      setLoading(true);
      const data = await questionSetService.getAll();
      setQuestionSets(data.questionSets);
    } catch (error) {
      console.error("Error fetching question sets:", error);
      setError("Failed to load question sets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionSets();
  }, []);

  // Filter question sets
  const filteredQuestionSets = questionSets.filter((set) => {
    const matchesSearch =
      set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      set.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || set.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const deleteQuestionSet = async (id: number) => {
    try {
      setLoading(true);
      await questionSetService.delete(id);
      setQuestionSets((prev) => prev.filter((set) => set.id !== id));
    } catch (error) {
      console.error("Error deleting question set:", error);
      setError("Failed to delete question set. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id: number) => {
    if (!confirm("Are you sure you want to delete this question set?")) {
      return;
    }
    await deleteQuestionSet(id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Question Sets</h1>
            <p className="text-gray-600 mt-1">
              Manage your question sets and their questions.
            </p>
          </div>
          <Button as="link" href="/admin/question-sets/create" variant="danger">
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
            Add Question Set
          </Button>
        </div>

        {/* Filters */}
        <SearchBar
          searchText={searchTerm}
          statusFilter={statusFilter}
          onSearchTextChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
        />

        <QuestionSetTable
          questionSets={filteredQuestionSets}
          onDelete={deleteHandler}
        />
      </div>
    </div>
  );
}
