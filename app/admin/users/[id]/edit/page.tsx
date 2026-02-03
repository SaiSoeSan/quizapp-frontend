"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userService } from "@/services/userService";
import LoadingSpinner from "@/components/ui/Loading";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserForm, { UserFormData } from "@/components/users/UserForm";

const EditUserPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<UserFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await userService.getUserById(Number(id));
        setInitialData({
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
          phone: response.user.phone || "",
        });
      } catch {
        setError("Failed to load user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (data: UserFormData) => {
    await userService.updateUser(Number(id), data);
    router.push("/admin/users");
  };

  if (loading) {
    return <LoadingSpinner title="Loading user..." />;
  }

  if (error || !initialData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error || "User not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Edit User"
          description="Update the user details."
          backLink={{
            text: "Back to Users",
            href: "/admin/users",
          }}
        />

        <UserForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
};

export default EditUserPage;
