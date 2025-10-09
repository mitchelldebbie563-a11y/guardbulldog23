const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Report = require('../models/Report');
const { authenticateToken, logActivity } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH || './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `report-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow common email file types
  const allowedTypes = [
    'text/plain',
    'text/html',
    'message/rfc822',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    files: 5
  }
});

// Submit new phishing report
router.post('/submit', [
  authenticateToken,
  upload.array('attachments', 5),
  body('emailSubject').trim().isLength({ min: 1 }).withMessage('Email subject is required'),
  body('senderEmail').isEmail().withMessage('Valid sender email is required'),
  body('emailContent').trim().isLength({ min: 1 }).withMessage('Email content is required'),
  body('reportType').isIn(['phishing', 'spam', 'malware', 'suspicious', 'other']).withMessage('Invalid report type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      emailSubject,
      senderEmail,
      senderName,
      emailContent,
      emailHeaders,
      reportType,
      severity
    } = req.body;

    // Process uploaded files
    const attachments = req.files ? req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path
    })) : [];

    // Create new report
    const report = new Report({
      reportedBy: req.user._id,
      emailSubject,
      senderEmail: senderEmail.toLowerCase(),
      senderName: senderName || '',
      emailContent,
      emailHeaders: emailHeaders || '',
      attachments,
      reportType,
      severity: severity || 'medium',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Basic automated analysis
    const riskIndicators = analyzeEmailContent(emailContent, emailSubject, senderEmail);
    if (riskIndicators.length > 0) {
      report.analysisResults = {
        indicators: riskIndicators,
        analyzedBy: 'system',
        analyzedAt: new Date()
      };
      report.analysisResults.riskScore = report.calculateRiskScore();
      
      // Set verdict based on risk score
      if (report.analysisResults.riskScore >= 80) {
        report.analysisResults.verdict = 'malicious';
        report.severity = 'high';
      } else if (report.analysisResults.riskScore >= 60) {
        report.analysisResults.verdict = 'suspicious';
      } else if (report.analysisResults.riskScore >= 30) {
        report.analysisResults.verdict = 'suspicious';
      } else {
        report.analysisResults.verdict = 'unknown';
      }
    }

    await report.save();

    // Add report to user's submitted reports
    req.user.reportsSubmitted.push(report._id);
    await req.user.save();

    res.status(201).json({
      message: 'Report submitted successfully',
      reportId: report._id,
      status: report.status,
      riskScore: report.analysisResults?.riskScore || 0
    });
  } catch (error) {
    console.error('Report submission error:', error);
    res.status(500).json({ message: 'Server error submitting report' });
  }
});

// Get user's reports
router.get('/my-reports', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reports = await Report.find({ reportedBy: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-emailContent -emailHeaders -attachments');

    const total = await Report.countDocuments({ reportedBy: req.user._id });

    res.json({
      reports,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Fetch reports error:', error);
    res.status(500).json({ message: 'Server error fetching reports' });
  }
});

// Get specific report details
router.get('/:reportId', authenticateToken, async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId)
      .populate('reportedBy', 'firstName lastName email')
      .populate('adminNotes.addedBy', 'firstName lastName');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if user can access this report
    const canAccess = report.reportedBy._id.toString() === req.user._id.toString() ||
                     ['admin', 'staff', 'faculty'].includes(req.user.role);

    if (!canAccess) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(report);
  } catch (error) {
    console.error('Fetch report error:', error);
    res.status(500).json({ message: 'Server error fetching report' });
  }
});

// Update report status (admin/staff only)
router.put('/:reportId/status', [
  authenticateToken,
  body('status').isIn(['pending', 'investigating', 'confirmed', 'false_positive', 'resolved']),
  body('notes').optional().trim()
], async (req, res) => {
  try {
    if (!['admin', 'staff', 'faculty'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, notes } = req.body;
    const report = await Report.findById(req.params.reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    await report.updateStatus(status, req.user._id, notes);

    res.json({
      message: 'Report status updated successfully',
      status: report.status
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error updating report status' });
  }
});

// Add admin note to report
router.post('/:reportId/notes', [
  authenticateToken,
  body('note').trim().isLength({ min: 1 }).withMessage('Note cannot be empty')
], async (req, res) => {
  try {
    if (!['admin', 'staff', 'faculty'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const report = await Report.findById(req.params.reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.adminNotes.push({
      note: req.body.note,
      addedBy: req.user._id
    });

    await report.save();

    res.json({ message: 'Note added successfully' });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ message: 'Server error adding note' });
  }
});

// Get trending threats
router.get('/analytics/trending', authenticateToken, async (req, res) => {
  try {
    if (!['admin', 'staff', 'faculty'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const days = parseInt(req.query.days) || 30;
    const trending = await Report.getTrendingThreats(days);

    res.json(trending);
  } catch (error) {
    console.error('Trending threats error:', error);
    res.status(500).json({ message: 'Server error fetching trending threats' });
  }
});

// Basic email content analysis function
function analyzeEmailContent(content, subject, senderEmail) {
  const indicators = [];
  const contentLower = content.toLowerCase();
  const subjectLower = subject.toLowerCase();

  // Suspicious keywords
  const suspiciousKeywords = [
    'urgent', 'immediate action', 'verify account', 'suspended', 'click here',
    'limited time', 'act now', 'congratulations', 'winner', 'prize',
    'free money', 'inheritance', 'lottery', 'tax refund', 'irs'
  ];

  suspiciousKeywords.forEach(keyword => {
    if (contentLower.includes(keyword) || subjectLower.includes(keyword)) {
      indicators.push({
        type: 'suspicious_keyword',
        description: `Contains suspicious keyword: "${keyword}"`,
        severity: 'medium'
      });
    }
  });

  // URL analysis
  const urlRegex = /https?:\/\/[^\s]+/gi;
  const urls = content.match(urlRegex) || [];
  
  urls.forEach(url => {
    if (url.includes('bit.ly') || url.includes('tinyurl') || url.includes('t.co')) {
      indicators.push({
        type: 'shortened_url',
        description: 'Contains shortened URL which may hide the real destination',
        severity: 'medium'
      });
    }
  });

  // Sender domain analysis
  const senderDomain = senderEmail.split('@')[1];
  if (senderDomain && !senderDomain.includes('bowie.edu')) {
    const suspiciousDomains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
    if (suspiciousDomains.includes(senderDomain)) {
      indicators.push({
        type: 'external_sender',
        description: 'Email from external domain requesting sensitive information',
        severity: 'low'
      });
    }
  }

  // Urgency indicators
  if (contentLower.includes('within 24 hours') || contentLower.includes('expires today')) {
    indicators.push({
      type: 'urgency_pressure',
      description: 'Creates false sense of urgency',
      severity: 'high'
    });
  }

  return indicators;
}

module.exports = router;
