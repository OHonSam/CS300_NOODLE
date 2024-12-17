const jwt = require('jsonwebtoken');

class AuthController {
  constructor(authService, mailService) {
    this.authService = authService;
    this.mailService = mailService;
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const { isValid, roleId } = await this.authService.checkCredential(username, password);
      
      if (!isValid) {
        return res.status(401).json({ message: 'Incorrect Username or Password!' });
      }

      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: '24h'
      });
      const user = { username, roleId };
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async changePassword(req, res) {
    try {
      const { username, newPassword } = req.body;
      const resetPasswordToken = req.account.resetPasswordToken;

      const isValid = await this.authService.checkResetPasswordCredential(username, resetPasswordToken);

      if (!isValid) {
        return res.status(401).json({ message: 'Invalid reset token' });
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

      const tokenData = await this.authService.addResetPasswordToken(username);

      if (!tokenData) {
        return res.status(500).json({ message: 'Failed to generate OTP' });
      }

      // Send OTP to account's email
      const emailSent = await this.mailService.sendOTP(account.email, tokenData.otp);
      
      if (!emailSent) {
        return res.status(500).json({ message: 'Failed to send OTP email' });
      }

      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async verifyOTP(req, res) {
    const { username, otp } = req.body;
    
    try {
      const isValidOTP = await this.authService.verifyOTP(username, otp);
      
      if (!isValidOTP) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      const account = await this.authService.Account.findOne({ username });
      const resetPasswordToken = account.resetPasswordToken;

      // Generate a temporary token for password reset
      const tempToken = jwt.sign({ username, resetPasswordToken, passwordReset: true}, process.env.JWT_SECRET, { expiresIn: '15m' });
      res.status(200).json({ token: tempToken });
    } catch (error) {
      console.error('OTP verification error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async logout(req, res) {
    res.json({ message: 'Logged out successfully' });
  }
}

module.exports = AuthController;