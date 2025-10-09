const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  emailSubject: {
    type: String,
    required: true,
    trim: true
  },
  senderEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  senderName: {
    type: String,
    trim: true
  },
  emailContent: {
    type: String,
    required: true
  },
  emailHeaders: {
    type: String
  },
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String
  }],
  reportType: {
    type: String,
    enum: ['phishing', 'spam', 'malware', 'suspicious', 'other'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'investigating', 'confirmed', 'false_positive', 'resolved'],
    default: 'pending'
  },
  analysisResults: {
    riskScore: {
      type: Number,
      min: 0,
      max: 100
    },
    indicators: [{
      type: String,
      description: String,
      severity: String
    }],
    verdict: {
      type: String,
      enum: ['safe', 'suspicious', 'malicious', 'unknown'],
      default: 'unknown'
    },
    analyzedBy: {
      type: String,
      enum: ['system', 'admin', 'security_team']
    },
    analyzedAt: Date
  },
  adminNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  ipAddress: String,
  userAgent: String,
  location: {
    country: String,
    region: String,
    city: String
  },
  followUpActions: [{
    action: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    performedAt: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  relatedReports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  educationalValue: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient queries
reportSchema.index({ reportedBy: 1, createdAt: -1 });
reportSchema.index({ status: 1, severity: 1 });
reportSchema.index({ senderEmail: 1 });
reportSchema.index({ reportType: 1, createdAt: -1 });

// Method to calculate risk score based on indicators
reportSchema.methods.calculateRiskScore = function() {
  if (!this.analysisResults.indicators || this.analysisResults.indicators.length === 0) {
    return 0;
  }
  
  let totalScore = 0;
  const severityWeights = { low: 1, medium: 2, high: 3, critical: 4 };
  
  this.analysisResults.indicators.forEach(indicator => {
    totalScore += severityWeights[indicator.severity] || 1;
  });
  
  // Normalize to 0-100 scale
  const maxPossibleScore = this.analysisResults.indicators.length * 4;
  return Math.round((totalScore / maxPossibleScore) * 100);
};

// Method to update status with timestamp
reportSchema.methods.updateStatus = function(newStatus, userId, notes) {
  this.status = newStatus;
  
  if (notes) {
    this.adminNotes.push({
      note: `Status changed to ${newStatus}: ${notes}`,
      addedBy: userId
    });
  }
  
  return this.save();
};

// Static method to get reports by date range
reportSchema.statics.getReportsByDateRange = function(startDate, endDate, filters = {}) {
  const query = {
    createdAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    },
    ...filters
  };
  
  return this.find(query)
    .populate('reportedBy', 'firstName lastName email role')
    .sort({ createdAt: -1 });
};

// Static method to get trending threats
reportSchema.statics.getTrendingThreats = function(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    { $group: {
      _id: '$senderEmail',
      count: { $sum: 1 },
      latestReport: { $max: '$createdAt' },
      severity: { $first: '$severity' }
    }},
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
};

module.exports = mongoose.model('Report', reportSchema);
