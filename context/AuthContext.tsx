"use client";

import { useContext, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { UserData } from "@/types/auth";

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  setUser: (user: UserData | null) => void;
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // eslint-disable-line
    setUser(authService.getUser());
    setToken(authService.getToken());
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, token, setUser, logout }}>
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
