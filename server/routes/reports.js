const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const reportsController = require('../controllers/reports');

// @route   POST api/reports
// @desc    Create a report
// @access  Private
router.post(
  '/',
  [auth, [check('emailContent', 'Email content is required').not().isEmpty()]],
  reportsController.createReport
);

// @route   GET api/reports
// @desc    Get all reports
// @access  Private
router.get('/', [auth, admin], reportsController.getReports);

module.exports = router;
