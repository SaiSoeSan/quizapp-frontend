"use client";

import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { userService } from "@/services/userService";
import UserForm, { UserFormData } from "@/components/users/UserForm";

export default function CreateStudentPage() {
  const router = useRouter();

  const handleSubmit = async (data: UserFormData) => {
    await userService.createStudent({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || undefined,
      password: data.password!,
    });
    router.push("/admin/users");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Add New Student"
          description="Create a new student account."
          backLink={{
            text: "Back to Users",
            href: "/admin/users",
          }}
        />
        <UserForm
          onSubmit={handleSubmit}
          submitLabel="Create Student"
          isCreate
        />

        {/* Tips */}
        <div className="mt-6 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Tips</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Make sure to use a valid email address for the student.</li>
            <li>• Password must be at least 6 characters long.</li>
            <li>• The student will use these credentials to log in.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
