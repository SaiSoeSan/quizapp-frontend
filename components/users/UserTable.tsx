"use client";

import { User } from "@/types/auth";
import UserRow from "./UserRow";

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
}

const UserTable = ({ users, onDelete }: UserTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Email</div>
        <div className="col-span-2">Phone</div>
        <div className="col-span-2 text-center">Joined</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>

      {/* Table Body */}
      {users.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="px-6 py-12 text-center">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
          <p className="text-gray-500">No students found.</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;
