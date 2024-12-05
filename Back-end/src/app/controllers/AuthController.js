const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class AuthController {
  constructor(authModel, authView) {
    this.model = authModel;
    this.view = authView;
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const isValid = await this.model.checkCredential(username, password);
      
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
        const isValid = await this.model.checkResetPasswordCredentials(
          username,
          resetPasswordToken
        );
        if (!isValid) {
          return res.status(401).json({ message: 'Invalid reset token' });
        }
      } else {
        const isValid = await this.model.checkCredential(username, oldPassword);
        if (!isValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      }

      await this.model.changePassword(username, newPassword);
      await this.model.removeResetPasswordToken(username);
      
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async resetPassword(req, res) {
    try {
      const { username } = req.body;
      const resetPasswordToken = await this.generateResetPasswordToken(username);
      
      if (!resetPasswordToken) {
        return res.status(404).json({ message: 'User not found' });
      }

      // In a real application, you would send this token via email
      res.json({ resetPasswordToken });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async logout(req, res) {
    // In a real application, you might want to invalidate the token
    res.json({ message: 'Logged out successfully' });
  }

  async generateResetPasswordToken(username) {
    const token = crypto.randomBytes(20).toString('hex');
    const success = await this.model.addResetPasswordToken(username, token);
    return success ? token : null;
  }
}

module.exports = AuthController;