"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/question-sets/SearchBar";
import QuestionSetTable from "@/components/question-sets/QuestionSetTable";
import { QuestionSet } from "@/types/questionSets";
import { questionSetService } from "@/services/questionSetService";
import LoadingSpinner from "@/components/ui/Loading";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Swal from "sweetalert2";

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
    const result = await Swal.fire({
      title: "Delete Question Set?",
      text: "This action cannot be undone!",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await deleteQuestionSet(id);
      Swal.fire("Deleted!", "Question set has been deleted.", "success");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Question Sets"
          description="Manage your question sets and their questions."
          backLink={{ text: "Back to Dashboard", href: "/admin/dashboard" }}
        >
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
        </DashboardHeader>

        {/* Filters */}
        <SearchBar
          searchText={searchTerm}
          statusFilter={statusFilter}
          onSearchTextChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
        />

        {loading && <LoadingSpinner title="Loading question sets..." />}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="danger" onClick={fetchQuestionSets}>
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && (
          <QuestionSetTable
            questionSets={filteredQuestionSets}
            onDelete={deleteHandler}
          />
        )}
      </div>
    </div>
  );
}
