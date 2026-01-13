import { error } from "console";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  const user = request.cookies.get("user")?.value || "";
  const pathName = request.nextUrl.pathname;

  const publicRoutes = ["/login", "/register", "/"];
  const isPublicRoute = publicRoutes.includes(pathName);
  const isProtectedRoute =
    pathName.startsWith("/admin") || pathName.startsWith("/student");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from public routes
  if (token && user && isPublicRoute) {
    try {
      const userData = JSON.parse(user);
      const redirectUrl =
        userData.role === "admin" ? "/admin/dashboard" : "/student/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
};
