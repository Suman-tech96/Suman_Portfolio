import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check & Diagnostic Endpoint
app.get('/api/health', (req, res) => {
  const hasUser = !!process.env.SMTP_USER;
  const hasPass = !!process.env.SMTP_PASS;
  res.json({
    status: 'ok',
    configured: hasUser && hasPass,
    smtpUser: process.env.SMTP_USER || 'Not set',
    receiverEmail: process.env.RECEIVER_EMAIL || 'sumanjana9692@gmail.com',
  });
});

// Nodemailer Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, projectType, budget, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const smtpUser = process.env.SMTP_USER?.trim();
    // Strip any accidental spaces from the Google App Password (e.g. "aptk mpyb hiwt unvq" -> "aptkmpybhiwtunvq")
    const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';
    const receiverEmail = process.env.RECEIVER_EMAIL?.trim() || 'sumanjana9692@gmail.com';

    if (!smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP_USER or SMTP_PASS is missing or empty in .env');
      return res.status(500).json({
        success: false,
        message: 'SMTP credentials missing. Please check SMTP_USER and SMTP_PASS in .env',
      });
    }

    console.log(`📨 Attempting to send email via Gmail SMTP for lead: ${name} (${email})...`);

    // Create Nodemailer Transporter with Gmail service & TLS support
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 1. Email to Suman Jana (Lead Notification)
    const mailOptions = {
      from: `"Portfolio Inquiry" <${smtpUser}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `🔥 New Project Inquiry: ${projectType || 'Full-Stack Project'} from ${name}`,
      text: `
New Client Project Inquiry:

Name: ${name}
Email: ${email}
Company: ${company || 'Not Specified'}
Project Type: ${projectType || 'Full-Stack Web App'}
Budget Range: ${budget || 'Not Specified'}

Project Message:
${message}

Sent from Suman Jana Portfolio Contact Form.
      `,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0A0A0C; color: #F5F2EB; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #121216; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #FF4D00, #FF6420); padding: 24px; text-align: center; }
            .header h1 { margin: 0; color: #000; font-size: 22px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
            .content { padding: 30px; }
            .field-group { margin-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #FF4D00; font-weight: bold; margin-bottom: 4px; }
            .value { font-size: 15px; color: #FFFFFF; font-weight: 500; }
            .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px; margin-top: 8px; color: #E0DDD5; line-height: 1.6; white-space: pre-wrap; }
            .footer { background: #0A0A0C; padding: 16px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid rgba(255,255,255,0.06); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Project Inquiry</h1>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Client Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field-group">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #00F0FF; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field-group">
                <div class="label">Company / Organization</div>
                <div class="value">${company || 'Not specified'}</div>
              </div>
              <div class="field-group">
                <div class="label">Project Type</div>
                <div class="value" style="color: #FF4D00; font-weight: bold;">${projectType || 'Full-Stack Web App'}</div>
              </div>
              <div class="field-group">
                <div class="label">Budget Estimate</div>
                <div class="value">${budget || 'Not specified'}</div>
              </div>
              <div class="field-group" style="border-bottom: none;">
                <div class="label">Project Scope & Requirements</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              Sent automatically from <strong>Suman Jana Portfolio</strong> Contact Form • ${new Date().toLocaleString()}
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Lead inquiry email sent to Suman Jana:', info.messageId);

    // 2. Send acknowledgment email back to the client
    try {
      await transporter.sendMail({
        from: `"Suman Jana" <${smtpUser}>`,
        to: email,
        subject: `Thank you for reaching out, ${name}! [Received]`,
        html: `
          <div style="font-family: sans-serif; background: #0A0A0C; color: #F5F2EB; padding: 24px; border-radius: 12px; max-width: 500px; margin: auto;">
            <h2 style="color: #FF4D00; margin-top: 0;">Inquiry Received!</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out regarding your <strong>${projectType}</strong> project.</p>
            <p>I have received your inquiry and will review your specifications carefully. I will get back to you within 24 hours.</p>
            <br />
            <p style="margin-bottom: 0;">Best regards,</p>
            <p style="margin-top: 4px; font-weight: bold; color: #FFF;">Suman Jana</p>
            <p style="font-size: 12px; color: #888;">Full-Stack Developer & Software Engineer</p>
          </div>
        `,
      });
      console.log('✅ Confirmation email sent to client:', email);
    } catch (clientAckError) {
      console.warn('Note: Client acknowledgment email error:', clientAckError.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry sent successfully via Nodemailer.',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('❌ Nodemailer Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email via SMTP server.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Nodemailer contact server is running on http://localhost:${PORT}`);
});
