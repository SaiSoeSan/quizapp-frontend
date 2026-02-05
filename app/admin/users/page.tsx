"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/auth";
import { userService } from "@/services/userService";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UserTable from "@/components/users/UserTable";
import LoadingSpinner from "@/components/ui/Loading";
import Button from "@/components/ui/Button";
import Swal from "sweetalert2";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllStudents();
      if (response.success) {
        setUsers(response.users);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users by search term
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return (
      fullName.includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.phone && user.phone.includes(searchTerm))
    );
  });

  const deleteUserHandler = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await userService.deleteUser(id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Failed to delete user. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Users"
          description="Manage student accounts."
          backLink={{ text: "Back to Dashboard", href: "/admin/dashboard" }}
        >
          <Button as="link" href="/admin/users/create" variant="danger">
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
            Add New Student
          </Button>
        </DashboardHeader>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              Total:{" "}
              <span className="font-semibold ml-1">{filteredUsers.length}</span>
              {"\u00A0"}
              students
            </div>
          </div>
        </div>

        {loading && <LoadingSpinner title="Loading users..." />}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="danger" onClick={fetchUsers}>
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && (
          <UserTable users={filteredUsers} onDelete={deleteUserHandler} />
        )}
      </div>
    </div>
  );
}
