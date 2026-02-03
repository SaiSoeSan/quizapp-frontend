"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useEffect, useState } from "react";
import { QuickAction } from "@/types/dashboard";
import { userService } from "@/services/userService";
import { attemptService } from "@/services/attemptService";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  QuestionSetsIcon,
  UsersIcon,
  AddUserIcon,
  PlusIcon,
  AttemptsIcon,
} from "@/components/icons/DashboardIcons";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import ListCard from "@/components/dashboard/ListCard";
import { User } from "@/types/auth";
import { Attempt } from "@/types/attempt";

// Static data - replace with API calls later
const stats = {
  questionSets: 24,
  questions: 482,
};

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
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [recentUsers, setRecentUsers] = useState<
    { id: number; title: string; subtitle: string; badgeText: string }[]
  >([]);
  const [recentAttempts, setRecentAttempts] = useState<
    { id: number; title: string; subtitle: string; badgeText: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await userService.getAllStudents();
        if (usersResponse.success) {
          setTotalUsers(usersResponse.total);
          const recent = usersResponse.users.slice(0, 4).map((user: User) => ({
            id: user.id,
            title: `${user.firstName} ${user.lastName}`,
            subtitle: user.email,
            badgeText: user.role,
          }));
          setRecentUsers(recent);
        }

        // Fetch attempts
        const attemptsResponse = await attemptService.getStats();
        if (attemptsResponse.success) {
          setTotalAttempts(attemptsResponse.totalAttempts);
          const recentAttemptsList = attemptsResponse.recentAttempts
            .slice(0, 4)
            .map((attempt: Attempt) => ({
              id: attempt.id,
              title: attempt.questionSet?.title || "Unknown Quiz",
              subtitle: `${attempt.user?.firstName} ${attempt.user?.lastName}`,
              badgeText: `${attempt.score}%`,
            }));
          setRecentAttempts(recentAttemptsList);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
            title="Total Attempts"
            value={isLoading ? "..." : totalAttempts}
            icon={<AttemptsIcon />}
            href="/admin/attempts"
            linkText="View all attempts →"
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
            title="Recent Attempts"
            items={recentAttempts}
            viewAllHref="/admin/attempts"
            viewAllText="View all attempts"
            showAvatar={true}
            showBadge={true}
          />
        </div>
      </div>
    </div>
  );
}
