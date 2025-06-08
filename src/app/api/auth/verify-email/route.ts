// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getEmailByToken, deleteToken } from '@/lib/tokenStore';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token || typeof token !== 'string') {
    return NextResponse.json(
      { success: false, error: 'Invalid token' },
      { status: 400 }
    );
  }

  const email = getEmailByToken(token);

  if (!email) {
    return new NextResponse('Invalid or expired token.', { status: 400 });
  }

  // In production: mark email as verified in DB
  console.log(`Verified email for token ${token}: ${email}`);

  // Remove token after use
  deleteToken(token);

  // Redirect back to the frontend with success flag
  const redirectUrl = new URL('/email-form', request.url);
  redirectUrl.searchParams.set('emailVerified', 'true');
  redirectUrl.searchParams.set('email', email);
  
  return NextResponse.redirect(redirectUrl);
}