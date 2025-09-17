
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase-admin';

// Force the middleware to run on the Node.js runtime
export const runtime = 'nodejs';

const PROTECTED_ROUTES = ['/dashboard'];
const PUBLIC_ROUTES = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  // If firebase-admin isn't configured, bypass middleware
  if (!auth) {
    console.warn("Firebase Admin SDK is not initialized. Skipping auth middleware.");
    return NextResponse.next();
  }

  // Redirect to login if trying to access a protected route without a session
  if (!sessionCookie && PROTECTED_ROUTES.includes(pathname)) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If a session exists, verify it
  if (sessionCookie) {
    try {
      await auth.verifySessionCookie(sessionCookie, true);
      
      // If the user is authenticated, redirect them from login/signup to the dashboard
      if (PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      // Invalid session cookie. 
      const loginUrl = new URL('/login', request.url);
      let response = NextResponse.redirect(loginUrl);

      // If not on a protected route, just clear the cookie and continue.
      if (!PROTECTED_ROUTES.includes(pathname)) {
        response = NextResponse.next();
      }
      
      response.cookies.set('session', '', { expires: new Date(0), path: '/' });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - and paths with file extensions (e.g. .png, .jpg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
