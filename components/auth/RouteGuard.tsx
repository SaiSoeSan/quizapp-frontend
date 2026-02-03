"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import LoadingSpinner from "@/components/ui/Loading";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRole: "admin" | "student";
}

export default function RouteGuard({ children, allowedRole }: RouteGuardProps) {
  const router = useRouter();
  const { user, token, isLoading } = useAuthContext();

  // Compute authorization status directly
  const isAuthenticated = !!token && !!user;
  const hasCorrectRole = user?.role === allowedRole;
  const isAuthorized = isAuthenticated && hasCorrectRole;

  useEffect(() => {
    // Wait for auth context to finish loading
    if (isLoading) return;

    // Not logged in
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Wrong role - redirect to appropriate dashboard
    if (!hasCorrectRole) {
      if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else if (user?.role === "student") {
        router.push("/student/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, hasCorrectRole, isLoading, user?.role, router]);

  if (isLoading) {
    return <LoadingSpinner title="Loading..." />;
  }

  if (!isAuthorized) {
    return <LoadingSpinner title="Redirecting..." />;
  }

  return <>{children}</>;
}
