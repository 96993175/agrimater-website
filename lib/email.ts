import sgMail from '@sendgrid/mail'

// Initialize SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const FROM_EMAIL = process.env.SENDGRID_FROM || 'no-reply@agrimater.com'

if (SENDGRID_API_KEY) {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY)
  } catch (error) {
    console.error('Failed to initialize SendGrid:', error)
  }
} else {
  console.warn('SENDGRID_API_KEY is not set - email functionality will be disabled')
}

export async function sendOTPEmail(email: string, otp: string, name?: string): Promise<{ success: boolean; error?: string }> {
  // Development mode or missing API key - just log OTP to console
  if (!SENDGRID_API_KEY || process.env.NODE_ENV === 'development') {
    console.log('\n========================================')
    console.log('📧 OTP EMAIL (Development Mode)')
    console.log('========================================')
    console.log(`To: ${email}`)
    console.log(`Name: ${name || 'N/A'}`)
    console.log(`OTP Code: ${otp}`)
    console.log('Expires: 10 minutes')
    console.log('========================================\n')
    return { success: true }
  }

  // Check if SendGrid is properly initialized
  if (!sgMail || !SENDGRID_API_KEY) {
    console.error('SendGrid is not properly configured')
    return { success: false, error: 'Email service is not configured' }
  }

  try {
    const msg = {
      to: email,
      from: FROM_EMAIL,
      subject: 'Your Agrimater OTP Verification Code',
      text: `Your OTP code is: ${otp}. This code will expire in 10 minutes.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background: white;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #00F28A 0%, #4BE96A 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              color: #1a1a1a;
              margin: 0;
              font-size: 28px;
              font-weight: 800;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 18px;
              color: #1a1a1a;
              margin-bottom: 20px;
              font-weight: 600;
            }
            .message {
              font-size: 16px;
              color: #666;
              margin-bottom: 30px;
              line-height: 1.8;
            }
            .otp-box {
              background: linear-gradient(135deg, rgba(0, 242, 138, 0.1) 0%, rgba(75, 233, 106, 0.1) 100%);
              border: 2px solid #00F28A;
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .otp-label {
              font-size: 14px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 10px;
              font-weight: 600;
            }
            .otp-code {
              font-size: 42px;
              font-weight: 900;
              color: #00F28A;
              letter-spacing: 8px;
              font-family: 'JetBrains Mono', monospace;
              margin: 10px 0;
            }
            .expiry {
              font-size: 13px;
              color: #999;
              margin-top: 10px;
            }
            .warning {
              background: #fff9e6;
              border-left: 4px solid #ffc107;
              padding: 15px 20px;
              margin: 25px 0;
              border-radius: 4px;
            }
            .warning p {
              margin: 0;
              font-size: 14px;
              color: #856404;
            }
            .footer {
              background: #f8f9fa;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #e0e0e0;
            }
            .footer p {
              margin: 5px 0;
              font-size: 13px;
              color: #999;
            }
            .footer a {
              color: #00F28A;
              text-decoration: none;
              font-weight: 600;
            }
            .logo {
              font-size: 16px;
              color: #1a1a1a;
              font-weight: 700;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🌾 AGRIMATER</div>
              <h1>Email Verification</h1>
            </div>
            
            <div class="content">
              <div class="greeting">
                Hello${name ? ` ${name}` : ''}! 👋
              </div>
              
              <div class="message">
                Thank you for joining Agrimater. To complete your registration and verify your email address, please use the One-Time Password (OTP) below:
              </div>
              
              <div class="otp-box">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
                <div class="expiry">⏱️ Expires in 10 minutes</div>
              </div>
              
              <div class="warning">
                <p><strong>⚠️ Security Notice:</strong> Never share this code with anyone. Agrimater staff will never ask for your OTP.</p>
              </div>
              
              <div class="message">
                If you didn't request this code, please ignore this email or contact our support team immediately.
              </div>
            </div>
            
            <div class="footer">
              <p class="logo">AGRIMATER</p>
              <p>AI-Powered Farm-to-Retail Transparency</p>
              <p>
                Need help? <a href="mailto:support@agrimater.com">Contact Support</a>
              </p>
              <p style="margin-top: 20px; color: #bbb; font-size: 12px;">
                © ${new Date().getFullYear()} Agrimater. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await sgMail.send(msg)
    return { success: true }
  } catch (error: any) {
    console.error('SendGrid Error:', error.response?.body || error.message)
    return {
      success: false,
      error: error.response?.body?.errors?.[0]?.message || error.message || 'Failed to send email',
    }
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<{ success: boolean; error?: string }> {
  // Development mode - just log to console
  if (!SENDGRID_API_KEY || process.env.NODE_ENV === 'development') {
    console.log('\n========================================')
    console.log('🎉 WELCOME EMAIL (Development Mode)')
    console.log('========================================')
    console.log(`To: ${email}`)
    console.log(`Name: ${name}`)
    console.log('Message: Welcome to Agrimater!')
    console.log('========================================\n')
    return { success: true }
  }

  try {
    const msg = {
      to: email,
      from: FROM_EMAIL,
      subject: 'Welcome to Agrimater! 🌾',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #00F28A 0%, #4BE96A 100%); padding: 40px; text-align: center; }
            .header h1 { color: #1a1a1a; margin: 0; font-size: 32px; font-weight: 800; }
            .content { padding: 40px 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to Agrimater!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>Your account has been successfully verified! You're now part of the agricultural revolution.</p>
              <p>With Agrimater, you can access AI-powered verification, grading, and complete farm-to-retail transparency.</p>
              <p><strong>Ready to get started?</strong> <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://agrimater.com'}/login" style="color: #00F28A;">Log in now</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await sgMail.send(msg)
    return { success: true }
  } catch (error: any) {
    console.error('SendGrid Error:', error.response?.body || error.message)
    return {
      success: false,
      error: error.response?.body?.errors?.[0]?.message || error.message || 'Failed to send email',
    }
  }
}
