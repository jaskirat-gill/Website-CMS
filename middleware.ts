// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Check if the request is for a protected route
  if (pathname.startsWith('/admin')) {
    if (!token) {
      // Redirect unauthenticated users to the sign-in page
      const signInUrl = new URL('/api/auth/signin', req.url);
      signInUrl.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Check if the user has the 'admin' role
    if (token.role !== 'admin') {
      // Redirect to unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // Allow the request to proceed if no protection is needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
