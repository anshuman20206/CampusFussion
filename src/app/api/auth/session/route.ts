import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('session');

  if (!sessionToken) {
    return NextResponse.json({ error: 'No session cookie found' }, { status: 401 });
  }

  return NextResponse.json({ token: sessionToken.value });
}
