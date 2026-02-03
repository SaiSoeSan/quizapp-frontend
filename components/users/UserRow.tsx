"use client";

import { User } from "@/types/auth";
import Link from "next/link";

interface UserRowProps {
  user: User;
  onDelete: (id: number) => void;
}

const UserRow = ({ user, onDelete }: UserRowProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
      {/* Name with Avatar */}
      <div className="col-span-3 flex items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-medium">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </span>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-800">
            {user.firstName} {user.lastName}
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="col-span-3 flex items-center">
        <span className="md:hidden text-gray-500 mr-2">Email:</span>
        <p className="text-sm text-gray-600 truncate">{user.email}</p>
      </div>

      {/* Phone */}
      <div className="col-span-2 flex items-center">
        <span className="md:hidden text-gray-500 mr-2">Phone:</span>
        <p className="text-sm text-gray-600">{user.phone || "-"}</p>
      </div>

      {/* Joined Date */}
      <div className="col-span-2 flex items-center md:justify-center">
        <span className="md:hidden text-gray-500 mr-2">Joined:</span>
        <p className="text-sm text-gray-500">{formatDate(user.createdAt)}</p>
      </div>

      {/* Actions */}
      <div className="col-span-2 flex items-center md:justify-center gap-2">
        {/* Edit User */}
        <Link
          href={`/admin/users/${user.id}/edit`}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit User"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </Link>

        {/* Delete */}
        <button
          onClick={() => onDelete(user.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          title="Delete"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserRow;
