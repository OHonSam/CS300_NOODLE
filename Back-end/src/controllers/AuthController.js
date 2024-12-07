const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class AuthController {
  constructor(authService, mailService) {
    this.authService = authService;
    this.mailService = mailService;
  }

  generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const isValid = await this.authService.checkCredential(username, password);
      
      if (!isValid) {
        return res.status(401).json({ message: 'Incorrect Username or Password!' });
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async changePassword(req, res) {
    try {
      const { username, oldPassword, resetPasswordToken } = req.body;
      const newPassword = req.body.newPassword;

      if (resetPasswordToken) {
        const isValid = await this.authService.checkResetPasswordCredentials(
          username,
          resetPasswordToken
        );
        if (!isValid) {
          return res.status(401).json({ message: 'Invalid reset token' });
        }
      } else {
        const isValid = await this.authService.checkCredential(username, oldPassword);
        if (!isValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      }

      await this.authService.changePassword(username, newPassword);
      await this.authService.removeResetPasswordToken(username);
      
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async resetPassword(req, res) {
    const { username } = req.body;
    
    try {
      const account = await this.authService.Account.findOne({ username });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      const otp = this.generateOTP();
      const success = await this.authService.addResetPasswordToken(username, otp);
      
      if (!success) {
        return res.status(500).json({ message: 'Failed to generate OTP' });
      }

      // Assuming email is stored in the account model
      const emailSent = await this.mailService.sendOTP(account.email, otp);
      
      if (!emailSent) {
        return res.status(500).json({ message: 'Failed to send OTP email' });
      }

      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async verifyOTP(req, res) {
    const { username, otp } = req.body;
    
    try {
      const isValid = await this.authService.checkResetPasswordCredentials(username, otp);
      
      if (!isValid) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      // Generate a temporary token for password reset
      const tempToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '15m' });
      res.status(200).json({ token: tempToken });
    } catch (error) {
      console.error('OTP verification error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async logout(req, res) {
    // In a real application, you might want to invalidate the token
    res.json({ message: 'Logged out successfully' });
  }
}

module.exports = AuthController;