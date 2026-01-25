"use client";

import { useState, useEffect } from "react";
import { Question, QuestionRequestFormData } from "@/types/question";
import Button from "../ui/Button";
import { on } from "events";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (questionData: QuestionRequestFormData) => Promise<void>;
  question?: Question | null; // null = create mode, Question = edit mode
  questionSetId: number;
}

const QuestionModal = ({
  isOpen,
  onClose,
  onSave,
  question,
}: QuestionModalProps) => {
  const isEditMode = !!question;

  const questionInitialData: QuestionRequestFormData = {
    question_text: "",
    question_type: "multiple_choice",
    options: [
      { option_text: "", is_correct: true },
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
    ],
  };

  const [formData, setFormData] =
    useState<QuestionRequestFormData>(questionInitialData);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal opens/closes or question changes
  useEffect(() => {
    if (isOpen) {
      if (question) {
        // Edit mode - populate with existing data
        setFormData({
          question_text: question.question_text,
          question_type: question.question_type,
          options:
            question.question_type === "true_false"
              ? [
                  {
                    id: question.options?.[0]?.id,
                    option_text: "True",
                    is_correct: question.options?.[0]?.is_correct || false,
                  },
                  {
                    id: question.options?.[1]?.id,
                    option_text: "False",
                    is_correct: question.options?.[1]?.is_correct || false,
                  },
                ]
              : question.options?.map((opt) => ({
                  id: opt.id,
                  option_text: opt.option_text,
                  is_correct: opt.is_correct,
                })) || [],
        });
      } else {
        // Create mode - reset to initial data
        setFormData(questionInitialData);
      }
      setError("");
    }
  }, [question, isOpen]);

  // Handle question type change
  const handleTypeChange = (type: "multiple_choice" | "true_false") => {
    setFormData((prev) => ({
      ...prev,
      question_type: type,
      options:
        type === "true_false"
          ? [
              { option_text: "True", is_correct: true },
              { option_text: "False", is_correct: false },
            ]
          : [
              { option_text: "", is_correct: true },
              { option_text: "", is_correct: false },
              { option_text: "", is_correct: false },
              { option_text: "", is_correct: false },
            ],
    }));
  };

  // Handle option text change
  const handleOptionChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) =>
        i === index ? { ...opt, option_text: value } : opt,
      ),
    }));
  };

  // Handle correct answer selection
  const handleCorrectChange = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => ({
        ...opt,
        is_correct: i === index,
      })),
    }));
  };

  // Add new option (for multiple choice)
  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData((prev) => ({
        ...prev,
        options: [...prev.options, { option_text: "", is_correct: false }],
      }));
    }
  };

  // Remove option
  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      // If we removed the correct answer, make the first one correct
      if (formData.options[index].is_correct) {
        newOptions[0].is_correct = true;
      }
      setFormData((prev) => ({ ...prev, options: newOptions }));
    }
  };

  // Validate and submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.question_text.trim()) {
      setError("Question text is required");
      return;
    }

    if (formData.question_type === "multiple_choice") {
      const emptyOptions = formData.options.filter(
        (opt) => !opt.option_text.trim(),
      );
      if (emptyOptions.length > 0) {
        setError("All options must have text");
        return;
      }
    }

    const hasCorrect = formData.options.some((opt) => opt.is_correct);
    if (!hasCorrect) {
      setError("Please select a correct answer");
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch {
      setError("Failed to save question. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditMode ? "Edit Question" : "Add New Question"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {error}
                </div>
              )}

              {/* Question Text */}
              <div>
                <label
                  htmlFor="question_text"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Question Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="question_text"
                  id="question_text"
                  value={formData.question_text}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      question_text: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent resize-none text-gray-700"
                  placeholder="Enter your question here..."
                />
              </div>

              {/* Question Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="question_type"
                      checked={formData.question_type === "multiple_choice"}
                      onChange={() => handleTypeChange("multiple_choice")}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">
                      Multiple Choice
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="question_type"
                      checked={formData.question_type === "true_false"}
                      onChange={() => handleTypeChange("true_false")}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">True/False</span>
                  </label>
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer Options <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Select the radio button next to the correct answer
                </p>

                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {/* Correct Answer Radio */}
                      <input
                        type="radio"
                        name="correct_answer"
                        checked={option.is_correct}
                        onChange={() => handleCorrectChange(index)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />

                      {/* Option Label */}
                      <span className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-600 font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>

                      {/* Option Input */}
                      {formData.question_type === "true_false" ? (
                        <span
                          className={`flex-1 px-4 py-2 bg-gray-50 border rounded-lg text-gray-700 ${
                            option.is_correct
                              ? "border-green-300 bg-green-50"
                              : "border-gray-300"
                          }`}
                        >
                          {option.option_text}
                        </span>
                      ) : (
                        <input
                          type="text"
                          value={option.option_text}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent text-gray-500 ${
                            option.is_correct
                              ? "border-green-300 bg-green-50"
                              : "border-gray-300"
                          }`}
                          placeholder={`Option ${String.fromCharCode(
                            65 + index,
                          )}`}
                        />
                      )}

                      {/* Remove Button (only for multiple choice with more than 2 options) */}
                      {formData.question_type === "multiple_choice" &&
                        formData.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                    </div>
                  ))}
                </div>

                {/* Add Option Button */}
                {formData.question_type === "multiple_choice" &&
                  formData.options.length < 6 && (
                    <button
                      type="button"
                      onClick={addOption}
                      className="mt-3 flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Option
                    </button>
                  )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="secondary" onClick={onClose} disabled={saving}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} variant="danger">
                {saving && (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {saving
                  ? "Saving..."
                  : isEditMode
                    ? "Update Question"
                    : "Add Question"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
