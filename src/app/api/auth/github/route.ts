
import { getAdminAuth } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

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
    try {
        const credentials = getCredentials();
        const adminAuth = getAdminAuth(credentials);
        
        const isSecure = req.nextUrl.protocol === 'https:';

        // The URL the user will be redirected to after signing in with GitHub
        const protocol = isSecure ? 'https' : 'http';
        const host = req.nextUrl.host;
        const redirectUri = `${protocol}://${host}/api/auth/callback`;
        
        const githubAuthProvider = new admin.auth.GithubAuthProvider();
        const state = Math.random().toString(36).substring(7);

        const authUrl = await adminAuth.createSignInLinkWithAuthRequest(githubAuthProvider.providerId, {
            redirectUri: redirectUri,
            state: state,
        });

        // Store the state in a temporary cookie to verify on callback
        cookies().set('github_oauth_state', state, {
            httpOnly: true,
            secure: isSecure,
            path: '/',
            maxAge: 60 * 10, // 10 minutes
        });
        
        return NextResponse.redirect(authUrl);

    } catch (error: any) {
        console.error('Error creating GitHub auth link:', error);
        return NextResponse.json({ error: 'Could not create GitHub sign-in link.', details: error.message }, { status: 500 });
    }
}
