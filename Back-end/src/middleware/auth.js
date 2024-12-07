const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

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
        const user = await User.findOne({ username: req.user.username });
        
        if (!user || !allowedRoles.includes(user.roleId)) {
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