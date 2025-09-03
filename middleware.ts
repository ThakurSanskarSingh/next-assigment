import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { ROUTES } from '@/constants/routes';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    `${ROUTES.ADMIN}/:path*`, // Protect all admin routes
    `/api${ROUTES.ADMIN}/:path*`, 
  ],
  runtime: "nodejs",
};
