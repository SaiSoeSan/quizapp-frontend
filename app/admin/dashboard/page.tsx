"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useEffect, useState } from "react";
import { QuickAction } from "@/types/dashboard";
import { userService } from "@/services/userService";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  QuestionSetsIcon,
  QuizzesIcon,
  UsersIcon,
  AddUserIcon,
  PlusIcon,
} from "@/components/icons/DashboardIcons";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import ListCard from "@/components/dashboard/ListCard";
import { User } from "@/types/auth";

// Static data - replace with API calls later
const stats = {
  questionSets: 24,
  questions: 482,
  activeQuizzes: 12,
};

const recentQuestionSets = [
  { id: 1, title: "JavaScript Basics", subtitle: 25 },
  { id: 2, title: "React Fundamentals", subtitle: 30 },
  { id: 3, title: "Node.js Quiz", subtitle: 20 },
  { id: 4, title: "TypeScript Advanced", subtitle: 15 },
];

const quickActions: QuickAction[] = [
  {
    href: "/admin/users/create",
    label: "Add New Student",
    icon: <AddUserIcon />,
    color: "blue",
  },
  {
    href: "/admin/question-sets/create",
    label: "Create Question Set",
    icon: <PlusIcon />,
    color: "green",
  },
];

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [recentUsers, setRecentUsers] = useState<
    { id: number; title: string; subtitle: string; badgeText: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllStudents();
        if (response.success) {
          setTotalUsers(response.total);
          // Get the 4 most recent users for the Recent Users list
          const recent = response.users.slice(0, 4).map((user: User) => ({
            id: user.id,
            title: `${user.firstName} ${user.lastName}`,
            subtitle: user.email,
            badgeText: user.role,
          }));
          setRecentUsers(recent);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title="Admin Dashboard"
          description="Manage your quiz platform from here."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Students"
            value={isLoading ? "..." : totalUsers}
            icon={<UsersIcon />}
            href="/admin/users"
            linkText="View all students →"
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
            title="Active Quizzes"
            value={stats.activeQuizzes}
            icon={<QuizzesIcon />}
            href=""
            linkText="View all quizzes →"
            color="orange"
          />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <QuickActionCard title="Quick Actions" actions={quickActions} />

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
