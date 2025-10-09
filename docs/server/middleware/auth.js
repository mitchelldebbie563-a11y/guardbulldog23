const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token - user not found' });
    }

    // NOTE: Account locking check removed for now, will be re-implemented.

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Middleware to check if user has required role
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        message: 'Insufficient permissions',
        required: allowedRoles,
        current: userRole
      });
    }

    next();
  };
};

// Middleware to check if user is admin
const requireAdmin = requireRole(['admin']);

// Middleware to check if user is staff or admin
const requireStaffOrAdmin = requireRole(['staff', 'faculty', 'admin']);

// Middleware to validate Bowie State email
const validateBowieEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (!email || !email.toLowerCase().endsWith('@bowie.edu')) {
    return res.status(400).json({ 
      message: 'Only Bowie State University email addresses are allowed' 
    });
  }
  
  next();
};

// Middleware to log user activity
const logActivity = (action) => {
  return (req, res, next) => {
    // Log user activity for audit purposes
    console.log(`[${new Date().toISOString()}] User ${req.user?.email || 'anonymous'} performed action: ${action}`);
    next();
  };
};

module.exports = {
  authenticateToken,
  requireRole,
  requireAdmin,
  requireStaffOrAdmin,
  validateBowieEmail,
  logActivity
};
