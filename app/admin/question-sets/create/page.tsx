"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { questionSetService } from "@/services/questionSetService";
import { FormData } from "@/types/questionSets";
import QuestionSetForm from "@/components/question-sets/QuestionSetForm";

export default function CreateQuestionSetPage() {
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    await questionSetService.create(data);
    router.push("/admin/question-sets");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Create Question Set"
          description="Create a new question set to organize your questions."
          backLink={{
            text: "Back to Question Sets",
            href: "/admin/question-sets",
          }}
        />
        <QuestionSetForm
          onSubmit={handleSubmit}
          submitLabel="Create Question Set"
        />

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
