// app/api/auth/callback/route.js
import { oauth2Client } from '../../../../../lib/google';
import { NextResponse } from 'next/server';

export async function GET(request: { url: string | URL; }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
   console.log(tokens)
    return NextResponse.json({ tokens });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 });
  }
}
