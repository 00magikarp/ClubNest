// app/api/auth/send-verification-email/route.ts
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { saveToken } from '@/lib/tokenStore';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generate token
    const token = uuidv4();
    saveToken(token, email);

    // Get the base URL from the request
    const baseUrl = new URL(request.url).origin;
    const verificationUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use this for testing, replace with your domain
      to: email,
      subject: 'Verify your email address',
      html: `
        <p>Please confirm your email by clicking the link below:</p>
        <p><a href="${verificationUrl}">Verify Email</a></p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p>${verificationUrl}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}