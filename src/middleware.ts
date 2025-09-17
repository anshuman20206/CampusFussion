import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase-admin';

const PROTECTED_ROUTES = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');

  if (!sessionCookie) {
    if (PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie.value, true);
    
    // Set a header with the token to be used in API routes or server components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-User-ID', decodedIdToken.uid);

    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });

  } catch (error) {
    console.log('Middleware error, invalid session cookie:', error);
    // Clear invalid cookie
    const response = NextResponse.next();
    if (PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
        const redirectUrl = new URL('/login', request.url);
        response.cookies.delete('session');
        return NextResponse.redirect(redirectUrl);
    }
    response.cookies.delete('session');
    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
