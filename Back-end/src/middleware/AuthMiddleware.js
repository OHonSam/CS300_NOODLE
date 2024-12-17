const jwt = require('jsonwebtoken');
const { Account } = require('../models/AccountModel');
const CryptoJS = require('crypto-js');

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const token = CryptoJS.AES.decrypt(req.headers.authorization?.split(' ')[1], process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8);


    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // For password reset flow, add specific checks
      if (decoded.passwordReset) {
        // Ensure the token contains necessary reset-specific information
        if (!decoded.username || !decoded.resetPasswordToken) {
          return res.status(401).json({ message: 'Invalid reset token' });
        }

        req.account = {
          username: decoded.username,
          resetPasswordToken: decoded.resetPasswordToken
        };
      } else {
        // Regular token verification for other routes
        req.account = decoded;
      }

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      res.status(401).json({ message: 'Invalid token' });
    }
  },

  checkRole: (allowedRoles) => {
    return async (req, res, next) => {
      try {
        const account = await Account.findOne({ username: req.account.username });

        if (!account || !allowedRoles.includes(account.roleId)) {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }

        next();
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    };
  },

  // New middleware specifically for password reset routes
  verifyPasswordResetToken: async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No reset token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded.passwordReset || !decoded.username || !decoded.resetPasswordToken) {
        return res.status(401).json({ message: 'Invalid reset token' });
      }

      const account = await Account.findOne({
        username: decoded.username,
        resetPasswordToken: decoded.resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!account) {
        return res.status(401).json({ message: 'Invalid or expired reset token' });
      }

      req.account = {
        username: decoded.username,
        resetPasswordToken: decoded.resetPasswordToken
      };

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Reset token has expired' });
      }
      res.status(401).json({ message: 'Invalid reset token' });
    }
  }
};

module.exports = authMiddleware;