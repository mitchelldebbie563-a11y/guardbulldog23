const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authenticateToken, validateBowieEmail } = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Register new user
router.post('/register', [
  validateBowieEmail,
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('role').isIn(['student', 'staff', 'faculty', 'reporter', 'analyst', 'admin', 'trainer']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, role, department } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
      role,
      department: department || ''
    });

    // Generate token
    const token = generateToken(user.user_id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login user
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // NOTE: Account locking logic removed for now, will be re-implemented.

    // Verify password
    const isValidPassword = await User.comparePasswords(password, user.password);
    if (!isValidPassword) {
      // NOTE: Login attempt incrementing removed for now.
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    await User.updateLastLogin(user.user_id);

    // Generate token
    const token = generateToken(user.user_id);
    
    // Remove password from user object before sending response
    delete user.password;

    res.json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  // The user object (without password) is already attached to req by authenticateToken
  // For now, we just return that. More complex data fetching (reports, etc.) will be added later.
  res.json({ user: req.user });
});

// Logout (client-side token removal)
router.post('/logout', authenticateToken, (req, res) => {
  // This is primarily a client-side action. The server can optionally blacklist the token if needed.
  res.json({ message: 'Logout successful' });
});

// Verify token
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});

module.exports = router;
