// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the secret used in NextAuth
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the path includes '/admin'
  if (pathname.startsWith("/admin")) {
    // Get the token from the request
    const token = await getToken({ req, secret, secureCookie: process.env.NODE_ENV === "production" });

    if (!token) {
      // Redirect unauthenticated users to the login page
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Check if the user has the 'admin' role
    if (token.role !== "admin") {
      // Redirect unauthorized users to the 403 page
      const forbiddenUrl = new URL("/403", req.url);
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  // Allow the request to proceed if no protection is needed
  return NextResponse.next();
}

// Specify the paths that should be intercepted by the middleware
export const config = {
  matcher: ["/admin/:path*"],
};
