"use client";

import RouteGuard from "@/components/auth/RouteGuard";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteGuard allowedRole="student">{children}</RouteGuard>;
}
