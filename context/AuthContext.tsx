"use client";

import { useContext, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { UserData } from "@/types/auth";

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: UserData | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(authService.getUser());
    setToken(authService.getToken());
    setIsLoading(false);
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, setUser, setToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
}
