"use client";

import Link from "next/link";
import Button from "../ui/Button";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-red-600">
            QuizApp
          </Link>

          {/* Dashboard Menu */}
          {user && (
            <div className="flex items-start space-x-4">
              <Link
                href="/student/dashboard"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/student/question-sets"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Weekly Lessons
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="text-md">
                    <span className="text-gray-700 font-medium">
                      {user.name}
                    </span>
                  </div>
                  <Button variant="secondary" onClick={logout}>
                    Logout
                  </Button>
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
