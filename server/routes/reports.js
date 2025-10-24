const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const reportsController = require('../controllers/reports');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'report-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|eml|msg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDFs, and email files are allowed'));
    }
  }
});

// @route   POST api/reports/submit
// @desc    Submit a phishing report
// @access  Private
router.post(
  '/submit',
  [
    auth,
    upload.array('attachments', 5),
    [
      check('emailSubject', 'Email subject is required').not().isEmpty(),
      check('senderEmail', 'Sender email is required').isEmail(),
      check('reportType', 'Report type is required').not().isEmpty()
    ]
  ],
  reportsController.submitReport
);

// @route   GET api/reports/user
// @desc    Get user's own reports
// @access  Private
router.get('/user', auth, reportsController.getUserReports);

// @route   GET api/reports/trending
// @desc    Get trending threats
// @access  Private
router.get('/trending', auth, reportsController.getTrendingThreats);

// @route   GET api/reports/stats
// @desc    Get report statistics
// @access  Private (Admin)
router.get('/stats', [auth, admin], reportsController.getReportStats);

// @route   GET api/reports/:id
// @desc    Get report by ID
// @access  Private
router.get('/:id', auth, reportsController.getReportById);

// @route   PUT api/reports/:id/status
// @desc    Update report status
// @access  Private (Admin)
router.put(
  '/:id/status',
  [auth, admin, [check('status', 'Status is required').not().isEmpty()]],
  reportsController.updateReportStatus
);

// @route   POST api/reports/:id/notes
// @desc    Add admin note to report
// @access  Private (Admin)
router.post(
  '/:id/notes',
  [auth, admin, [check('note', 'Note content is required').not().isEmpty()]],
  reportsController.addAdminNote
);

module.exports = router;
