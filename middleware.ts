import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/admin/:path*', // Protect all admin routes
    '/api/admin/:path*', // Protect admin API routes (if any)
  ],
  runtime: "nodejs",
};
