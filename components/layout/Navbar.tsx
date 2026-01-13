"use client";

import { authService } from "@/services/authService";
import { useState, useEffect } from "react";
import { UserData } from "@/types/auth";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(authService.getUser());
  }, []);

  if (!mounted) {
    return <nav className="bg-white shadow-md h-16" />;
  }

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-red-600">
            QuizApp
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="text-md">
                    <span className="text-gray-700 font-medium">
                      {user.name}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
