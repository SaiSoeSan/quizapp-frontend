"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { FormData } from "@/types/questionSets";

interface QuestionSetFormProps {
  initialData?: FormData;
  onSubmit: (data: FormData) => Promise<void>;
  submitLabel?: string;
  isEdit?: boolean;
}

const defaultFormData: FormData = {
  title: "",
  description: "",
  youtubeLink: "",
  status: "draft",
};

const QuestionSetForm = ({
  initialData = defaultFormData,
  onSubmit,
  submitLabel = "Save",
  isEdit = false,
}: QuestionSetFormProps) => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // I want to show validation erros here

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSubmit(formData);
    } catch {
      setError("Failed to save question set. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 resize-none"
          />
        </div>

        {/* YouTube Link */}
        <div>
          <label
            htmlFor="youtubeLink"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            YouTube Link
          </label>
          <input
            type="url"
            id="youtubeLink"
            name="youtubeLink"
            value={formData.youtubeLink}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/admin/question-sets")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="danger" loading={saving}>
            {saving ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionSetForm;
