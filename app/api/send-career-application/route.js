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

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !body[field] || body[field].trim() === '');
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Build email content
    const emailBody = `
Job Application Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Position: ${body.jobTitle || 'N/A'}
Department: ${body.department || 'N/A'}

Personal Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone}
LinkedIn/Portfolio: ${body.portfolio || 'Not provided'}

Cover Letter:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${body.coverLetter || 'Not provided'}

Resume: ${body.resumeFileName || 'Not uploaded'}
    `.trim();

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
      pool: false,
    });

    // Prepare email with attachment if resume is provided
    const mailOptions = {
      from: process.env.BREVO_SENDER,
      to: 'kirynex1@gmail.com',
      subject: `Job Application: ${body.jobTitle || 'Career Application'}`,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; border-radius: 10px 10px 0 0; color: white;">
            <h1 style="margin: 0; font-size: 24px;">New Job Application</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${body.jobTitle || 'Career Application'}</p>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">Personal Information</h2>
              <p style="margin: 8px 0;"><strong>Full Name:</strong> ${body.name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${body.email}" style="color: #2563eb;">${body.email}</a></p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${body.phone}" style="color: #2563eb;">${body.phone}</a></p>
              ${body.portfolio ? `<p style="margin: 8px 0;"><strong>Portfolio:</strong> <a href="${body.portfolio}" target="_blank" style="color: #2563eb;">${body.portfolio}</a></p>` : ''}
            </div>
            ${body.coverLetter ? `
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">Cover Letter</h2>
              <p style="margin: 0; color: #4b5563; white-space: pre-wrap; line-height: 1.8;">${body.coverLetter}</p>
            </div>
            ` : ''}
            ${body.resumeFileName ? `
            <div style="background: white; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0;"><strong>Resume:</strong> ${body.resumeFileName}</p>
            </div>
            ` : ''}
          </div>
        </div>
      `,
    };

    // If resume file is provided as base64, attach it
    if (body.resumeFile && body.resumeFileName) {
      mailOptions.attachments = [{
        filename: body.resumeFileName,
        content: body.resumeFile.split(',')[1] || body.resumeFile,
        encoding: 'base64',
      }];
    }

    // Send email via SMTP
    await transporter.sendMail(mailOptions);

    // Close the connection
    transporter.close();

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

