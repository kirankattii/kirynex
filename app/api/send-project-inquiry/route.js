
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
    
    // Service ID to label mapping
    const serviceLabels = {
      'web': 'Web Development',
      'mobile': 'Mobile App',
      'ai': 'AI Integration',
      'design': 'Product Design',
      'consulting': 'Tech Consulting',
      'other': 'Other'
    };
    
    // Validate that required fields are not empty
    const requiredFields = ['name', 'email'];
    const missingFields = requiredFields.filter(field => !fields[field] || fields[field].trim() === '');
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Build email content with all fields
    const emailBody = Object.entries(fields)
      .map(([key, value]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        // Handle array values (like service selections)
        let formattedValue;
        if (Array.isArray(value)) {
          if (key === 'service') {
            // Map service IDs to labels
            formattedValue = value.map(id => serviceLabels[id] || id).join(', ');
          } else {
            formattedValue = value.join(', ');
          }
        } else {
          formattedValue = value;
        }
        return `${label}: ${formattedValue}`;
      })
      .join('\n');

    const emailText = `New Project Inquiry Submission\n\n${emailBody}`;

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
      subject: 'New Project Inquiry',
      text: emailText,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"><pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${emailText.replace(/\n/g, '<br>')}</pre></div>`,
    });

    // Close the connection (important for serverless)
    transporter.close();

    return NextResponse.json(
      { success: true, message: 'Project inquiry submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Project inquiry error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

