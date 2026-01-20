"use client";

import Link from "next/link";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useEffect, useState } from "react";
import { UserData } from "@/types/auth";
import { QuickAction } from "@/types/dashboard";
import { authService } from "@/services/authService";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  QuestionSetsIcon,
  QuestionsIcon,
  QuizzesIcon,
  UsersIcon,
  AddUserIcon,
  PlusIcon,
} from "@/components/icons/DashboardIcons";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import ListCard from "@/components/dashboard/ListCard";

// Static data - replace with API calls later
const stats = {
  users: 156,
  questionSets: 24,
  questions: 482,
  activeQuizzes: 12,
};

const recentUsers = [
  {
    id: 1,
    title: "John Doe",
    subtitle: "john@example.com",
    badgeText: "student",
  },
  {
    id: 2,
    title: "Jane Smith",
    subtitle: "jane@example.com",
    badgeText: "student",
  },
  {
    id: 3,
    title: "Mike Wilson",
    subtitle: "mike@example.com",
    badgeText: "teacher",
  },
  {
    id: 4,
    title: "Sarah Brown",
    subtitle: "sarah@example.com",
    badgeText: "student",
  },
];

const recentQuestionSets = [
  { id: 1, title: "JavaScript Basics", subtitle: 25 },
  { id: 2, title: "React Fundamentals", subtitle: 30 },
  { id: 3, title: "Node.js Quiz", subtitle: 20 },
  { id: 4, title: "TypeScript Advanced", subtitle: 15 },
];

const quickActions: QuickAction[] = [
  {
    href: "/admin/users/create",
    label: "Add New User",
    icon: <AddUserIcon />,
    color: "blue",
  },
  {
    href: "/admin/question-sets/create",
    label: "Create Question Set",
    icon: <PlusIcon />,
    color: "green",
  },
  {
    href: "/admin/questions/create",
    label: "Add New Question",
    icon: <PlusIcon />,
    color: "purple",
  },
  {
    href: "/admin/quizzes/create",
    label: "Create New Quiz",
    icon: <PlusIcon />,
    color: "orange",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Admin Dashboard"
          description="Manage your quiz platform from here."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats.users}
            icon={<UsersIcon />}
            href="/admin/users"
            linkText="View all users →"
            color="blue"
          />
          <StatsCard
            title="Total Question Sets"
            value={stats.questionSets}
            icon={<QuestionSetsIcon />}
            href="/admin/question-sets"
            linkText="View all question sets →"
            color="green"
          />
          <StatsCard
            title="Total Questions"
            value={stats.questions}
            icon={<QuestionsIcon />}
            href="/admin/questions"
            linkText="View all questions →"
            color="purple"
          />
          <StatsCard
            title="Active Quizzes"
            value={stats.activeQuizzes}
            icon={<QuizzesIcon />}
            href="/admin/quizzes"
            linkText="View all quizzes →"
            color="orange"
          />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <QuickActionCard title="Quick Actions" actions={quickActions} />

          {/* Recent Users */}
          {/* <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Users
            </h2>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      user.role === "teacher"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/admin/users"
              className="block mt-4 text-center text-sm text-red-600 hover:underline"
            >
              View all users
            </Link>
          </div> */}

          <ListCard
            title="Recent Users"
            items={recentUsers}
            viewAllHref="/admin/users"
            viewAllText="View all users"
            showAvatar={true}
            showBadge={true}
          />
          <ListCard
            title="Recent Question Sets"
            items={recentQuestionSets}
            viewAllHref="/admin/question-sets"
            viewAllText="View all question sets"
          />
        </div>
      </div>
    </div>
  );
}
