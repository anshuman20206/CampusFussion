import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth } from '@/lib/firebase-admin';

function getCredentials() {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Missing Firebase Admin credentials.');
    }

    return { projectId, clientEmail, privateKey };
}

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  if (!idToken) {
    return NextResponse.json({ error: 'idToken is required' }, { status: 400 });
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const credentials = getCredentials();
    const adminAuth = getAdminAuth(credentials);

    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    cookies().set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 401 });
  }
}

export async function GET() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('session');

  if (!sessionToken) {
    return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
  }

  return NextResponse.json({ token: sessionToken.value });
}
