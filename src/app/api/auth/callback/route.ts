
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/firebase-admin';
import { createUserInFirestore } from '@/app/auth/actions';

function getCredentials() {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Missing Firebase Admin credentials.');
    }

    return { projectId, clientEmail, privateKey };
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const storedState = cookies().get('github_oauth_state')?.value;
    
    // Clean up state cookie
    cookies().delete('github_oauth_state');

    if (!code || !state || state !== storedState) {
        return NextResponse.redirect(new URL('/login?error=invalid_state', req.url));
    }

    try {
        const credentials = getCredentials();
        const adminAuth = getAdminAuth(credentials);

        const isSecure = req.nextUrl.protocol === 'https:';
        const protocol = isSecure ? 'https' : 'http';
        const host = req.nextUrl.host;
        const redirectUri = `${protocol}://${host}/api/auth/callback`;

        // Exchange the code for a token and sign in the user.
        const decodedToken = await adminAuth.signInWithAuthRequest('github.com', {
            code: code,
            state: state,
            redirectUri: redirectUri,
        });

        // Create a session cookie.
        const sessionCookie = await adminAuth.createSessionCookie(decodedToken.token, {
            expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
        });

        const user = decodedToken.user;
        
        // Ensure user record exists in Firestore.
        await createUserInFirestore(user.uid, user.email, user.displayName, user.photoURL);

        // Set the session cookie and redirect.
        cookies().set('session', sessionCookie, {
            httpOnly: true,
            secure: isSecure,
            path: '/',
            maxAge: 60 * 60 * 24 * 5, // 5 days
        });

        return NextResponse.redirect(new URL('/dashboard', req.url));

    } catch (error: any) {
        console.error('Firebase auth callback error:', error);
        let errorMessage = 'Authentication failed. Please try again.';
        if (error.code === 'auth/account-exists-with-different-credential') {
            errorMessage = 'An account already exists with this email using a different provider.';
        }
        return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorMessage)}`, req.url));
    }
}
