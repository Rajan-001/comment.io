// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { oauth2Client } from '../../../../../lib/google';

export async function GET() {
  console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Redirect URI:', process.env.GOOGLE_REDIRECT_URI);
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/youtube.force-ssl'],
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  });
console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Redirect URI:', process.env.GOOGLE_REDIRECT_URI);
  return NextResponse.redirect(url);
}