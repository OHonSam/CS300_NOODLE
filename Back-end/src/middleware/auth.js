const jwt = require('jsonwebtoken');
const { Account } = require('../app/models/Account');

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  },

  checkRole: (allowedRoles) => {
    return async (req, res, next) => {
      try {
        const account = await Account.findOne({ username: req.user.username });
        
        if (!account || !allowedRoles.includes(account.roleId)) {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
        
        next();
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    };
  }
};

module.exports = authMiddleware;