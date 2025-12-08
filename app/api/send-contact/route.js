import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Ensure this runs on Node.js runtime (required for nodemailer)
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required environment variables
    if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_KEY || !process.env.BREVO_SENDER) {
      console.error('Missing environment variables:', {
        hasSmtpUser: !!process.env.BREVO_SMTP_USER,
        hasSmtpKey: !!process.env.BREVO_SMTP_KEY,
        hasSender: !!process.env.BREVO_SENDER,
      });
      return NextResponse.json(
        { 
          error: 'Email service configuration missing',
          details: 'BREVO_SMTP_USER, BREVO_SMTP_KEY, and BREVO_SENDER must be set in environment variables'
        },
        { status: 500 }
      );
    }

    // Extract all fields dynamically
    const fields = { ...body };
    
    // Validate that name is provided
    if (!fields.name || fields.name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Validate that at least one contact method is provided (email or phone)
    const email = fields.email ? fields.email.trim() : '';
    const phone = fields.phone ? fields.phone.trim() : '';
    
    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Please provide either an email address or phone number' },
        { status: 400 }
      );
    }

    // Build email content with all fields
    const emailBody = Object.entries(fields)
      .map(([key, value]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        return `${label}: ${value}`;
      })
      .join('\n');

    const emailText = `New Contact Form Submission\n\n${emailBody}`;

    // Create SMTP transporter (optimized for serverless/Vercel)
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 5000, // 5 seconds
      socketTimeout: 10000, // 10 seconds
      pool: false, // Disable connection pooling for serverless
    });

    // Send email via SMTP
    await transporter.sendMail({
      from: process.env.BREVO_SENDER,
      to: 'kirynex1@gmail.com',
      subject: 'New Contact Form Submission',
      text: emailText,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"><pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${emailText.replace(/\n/g, '<br>')}</pre></div>`,
    });

    // Close the connection (important for serverless)
    transporter.close();

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}
