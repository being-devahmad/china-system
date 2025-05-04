import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // Import from the jose library

const JWT_SECRET = process.env.JWT_SECRET!; // Make sure it's defined

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // If token exists and the user is trying to access /auth/* routes, redirect to /dashboard
  if (token && req.url.includes('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If no token exists and the user is not trying to access /auth/* routes, redirect to /auth/sign-in
  if (!token && !req.url.includes('/auth')) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  try {
    // If the token exists, verify it using jose
    if (token) {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      // Token is valid, proceed with the request
    }

    return NextResponse.next();

  } catch (error) {
    console.error('JWT verification failed:', error);

    // If token verification fails, redirect to /auth/sign-in
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }
}

// Apply middleware to protect the routes
export const config = {
  matcher: [
    '/auth/:path*', // Protect /auth/* routes
    '/dashboard/:path*', // Protect /dashboard/* routes
    // Add more protected paths if needed
  ],
};
