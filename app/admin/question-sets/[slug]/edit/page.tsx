"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { questionSetService } from "@/services/questionSetService";
import LoadingSpinner from "@/components/ui/Loading";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { FormData } from "@/types/questionSets";
import QuestionSetForm from "@/components/question-sets/QuestionSetForm";

const EditQuestionSetPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionSet = async () => {
      try {
        setLoading(true);
        const response = await questionSetService.getById(Number(slug));
        setInitialData({
          title: response.questionSet.title,
          description: response.questionSet.description || "",
          youtubeLink: response.questionSet.youtubeLink || "",
          status: response.questionSet.status,
        });
      } catch {
        setError("Failed to load question set.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionSet();
  }, [slug]);

  const handleSubmit = async (data: FormData) => {
    await questionSetService.update(Number(slug), data);
    router.push("/admin/question-sets");
  };

  if (loading) {
    return <LoadingSpinner title="Loading question set..." />;
  }

  if (error || !initialData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error || "Question set not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Edit Question Set"
          description="Update the question set details."
          backLink={{
            text: "Back to Question Sets",
            href: "/admin/question-sets",
          }}
        />

        <QuestionSetForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          isEdit
        />
      </div>
    </div>
  );
};

export default EditQuestionSetPage;
