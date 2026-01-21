"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { questionSetService } from "@/services/questionSetService";

export default function CreateQuestionSetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeLink: "",
    status: "draft" as "active" | "draft",
  });

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | HTMLInputElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await questionSetService.create(formData);
      // Redirect to question sets list
      router.push("/admin/question-sets");
    } catch (err) {
      console.error("Error creating question set:", err);
      setError("Failed to create question set. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Create Question Set"
          description="Create a new question set to organize your questions."
          backLink={{
            text: "Back to Question Sets",
            href: "/admin/question-sets",
          }}
        />

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., JavaScript Basics"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what this question set covers..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700 resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="youtubeLink"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Youtube Link
              </label>
              <input
                type="text"
                id="youtubeLink"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleChange}
                placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Draft question sets are not visible to students.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/question-sets"
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </Link>
              <Button type="submit" disabled={loading} variant="danger">
                {loading ? "Creating..." : "Create Question Set"}
              </Button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Tips</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Choose a clear, descriptive name for your question set.</li>
            <li>• You can add questions after creating the question set.</li>
            <li>
              • Set status to &quot;Draft&quot; while you&apos;re still adding
              questions.
            </li>
            <li>
              • Change status to &quot;Active&quot; when ready for students.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
