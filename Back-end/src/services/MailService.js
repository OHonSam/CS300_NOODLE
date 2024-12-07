const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

class MailService {
  constructor() {
  this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
    });
  }

  async sendOTP(email, otp) {
    const mailOptions = {
      from: `"NOODLE" <${process.env.SMTP_USER}>`, // Use a formatted from address
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <h1>Password Reset Request</h1>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    try {      
      // Send mail
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return true;
    } catch (error) {
      console.error('Detailed mail error:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
        response: error.response
      });
      return false;
    }
  }
}

module.exports = MailService;