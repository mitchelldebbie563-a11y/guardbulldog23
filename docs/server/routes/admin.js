const express = require('express');
const { body, validationResult } = require('express-validator');
const Report = require('../models/Report');
const User = require('../models/User');
const EducationModule = require('../models/EducationModule');
const { authenticateToken, requireAdmin, requireStaffOrAdmin, logActivity } = require('../middleware/auth');

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard', [
  authenticateToken,
  requireStaffOrAdmin
], async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get report statistics
    const [
      totalReports,
      reportsLast30Days,
      reportsLast7Days,
      pendingReports,
      confirmedThreats,
      falsePositives
    ] = await Promise.all([
      Report.countDocuments(),
      Report.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Report.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Report.countDocuments({ status: 'pending' }),
      Report.countDocuments({ status: 'confirmed' }),
      Report.countDocuments({ status: 'false_positive' })
    ]);

    // Get user statistics
    const [
      totalUsers,
      activeUsers,
      newUsersLast30Days
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ lastLogin: { $gte: thirtyDaysAgo } }),
      User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } })
    ]);

    // Get education statistics
    const [
      totalModules,
      activeModules,
      totalCompletions
    ] = await Promise.all([
      EducationModule.countDocuments(),
      EducationModule.countDocuments({ isActive: true }),
      User.aggregate([
        { $project: { completedCount: { $size: '$educationProgress.completedModules' } } },
        { $group: { _id: null, total: { $sum: '$completedCount' } } }
      ])
    ]);

    // Get report trends by day (last 30 days)
    const reportTrends = await Report.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Get threat distribution
    const threatDistribution = await Report.aggregate([
      { $group: { _id: '$reportType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get top threat sources
    const topThreatSources = await Report.aggregate([
      { $match: { status: { $in: ['confirmed', 'investigating'] } } },
      { $group: { _id: '$senderEmail', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      reports: {
        total: totalReports,
        last30Days: reportsLast30Days,
        last7Days: reportsLast7Days,
        pending: pendingReports,
        confirmed: confirmedThreats,
        falsePositives,
        trends: reportTrends,
        distribution: threatDistribution,
        topSources: topThreatSources
      },
      users: {
        total: totalUsers,
        active: activeUsers,
        newLast30Days: newUsersLast30Days
      },
      education: {
        totalModules,
        activeModules,
        totalCompletions: totalCompletions[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard statistics' });
  }
});

// Get all reports with filtering and pagination
router.get('/reports', [
  authenticateToken,
  requireStaffOrAdmin
], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter query
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.reportType) filter.reportType = req.query.reportType;
    if (req.query.severity) filter.severity = req.query.severity;
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) filter.createdAt.$gte = new Date(req.query.startDate);
      if (req.query.endDate) filter.createdAt.$lte = new Date(req.query.endDate);
    }

    const reports = await Report.find(filter)
      .populate('reportedBy', 'firstName lastName email role')
      .select('-emailContent -emailHeaders -attachments')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Report.countDocuments(filter);

    res.json({
      reports,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Admin reports fetch error:', error);
    res.status(500).json({ message: 'Server error fetching reports' });
  }
});

// Get all users with filtering and pagination
router.get('/users', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter query
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.department) filter.department = new RegExp(req.query.department, 'i');
    if (req.query.search) {
      filter.$or = [
        { firstName: new RegExp(req.query.search, 'i') },
        { lastName: new RegExp(req.query.search, 'i') },
        { email: new RegExp(req.query.search, 'i') }
      ];
    }

    const users = await User.find(filter)
      .select('-password -loginAttempts -lockUntil')
      .populate('reportsSubmitted', 'reportType status createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Admin users fetch error:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// Update user role (admin only)
router.put('/users/:userId/role', [
  authenticateToken,
  requireAdmin,
  body('role').isIn(['student', 'staff', 'faculty', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true, runValidators: true }
    ).select('-password -loginAttempts -lockUntil');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ message: 'Server error updating user role' });
  }
});

// Bulk update report status
router.put('/reports/bulk-update', [
  authenticateToken,
  requireStaffOrAdmin,
  body('reportIds').isArray().withMessage('Report IDs must be an array'),
  body('status').isIn(['pending', 'investigating', 'confirmed', 'false_positive', 'resolved']),
  body('notes').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reportIds, status, notes } = req.body;

    const updateData = { status };
    if (notes) {
      updateData.$push = {
        adminNotes: {
          note: `Bulk update: ${notes}`,
          addedBy: req.user._id,
          addedAt: new Date()
        }
      };
    }

    const result = await Report.updateMany(
      { _id: { $in: reportIds } },
      updateData
    );

    res.json({
      message: `${result.modifiedCount} reports updated successfully`,
      updated: result.modifiedCount
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({ message: 'Server error updating reports' });
  }
});

// Export reports data
router.get('/reports/export', [
  authenticateToken,
  requireStaffOrAdmin
], async (req, res) => {
  try {
    const { format = 'json', startDate, endDate } = req.query;
    
    const filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const reports = await Report.find(filter)
      .populate('reportedBy', 'firstName lastName email role department')
      .select('-emailContent -emailHeaders -attachments')
      .sort({ createdAt: -1 });

    if (format === 'csv') {
      // Convert to CSV format
      const csvHeaders = [
        'Report ID', 'Reported By', 'Email', 'Subject', 'Sender Email',
        'Report Type', 'Severity', 'Status', 'Risk Score', 'Created At'
      ];
      
      const csvRows = reports.map(report => [
        report._id,
        report.reportedBy ? `${report.reportedBy.firstName} ${report.reportedBy.lastName}` : 'Unknown',
        report.reportedBy?.email || 'Unknown',
        report.emailSubject,
        report.senderEmail,
        report.reportType,
        report.severity,
        report.status,
        report.analysisResults?.riskScore || 0,
        report.createdAt.toISOString()
      ]);

      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="reports-export.csv"');
      res.send(csvContent);
    } else {
      res.json(reports);
    }
  } catch (error) {
    console.error('Export reports error:', error);
    res.status(500).json({ message: 'Server error exporting reports' });
  }
});

// Get system health status
router.get('/system/health', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    const mongoose = require('mongoose');
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        name: mongoose.connection.name
      },
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      version: process.version
    };

    res.json(health);
  } catch (error) {
    console.error('System health error:', error);
    res.status(500).json({ 
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get audit logs (admin only)
router.get('/audit-logs', [
  authenticateToken,
  requireAdmin
], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // This would typically come from a dedicated audit log collection
    // For now, we'll return recent admin actions from reports
    const recentActions = await Report.aggregate([
      { $unwind: '$adminNotes' },
      {
        $lookup: {
          from: 'users',
          localField: 'adminNotes.addedBy',
          foreignField: '_id',
          as: 'admin'
        }
      },
      { $unwind: '$admin' },
      {
        $project: {
          action: 'admin_note_added',
          details: '$adminNotes.note',
          performedBy: {
            name: { $concat: ['$admin.firstName', ' ', '$admin.lastName'] },
            email: '$admin.email'
          },
          timestamp: '$adminNotes.addedAt',
          resourceId: '$_id',
          resourceType: 'report'
        }
      },
      { $sort: { timestamp: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);

    res.json({
      logs: recentActions,
      pagination: {
        current: page,
        pages: Math.ceil(recentActions.length / limit),
        total: recentActions.length
      }
    });
  } catch (error) {
    console.error('Audit logs error:', error);
    res.status(500).json({ message: 'Server error fetching audit logs' });
  }
});

module.exports = router;
