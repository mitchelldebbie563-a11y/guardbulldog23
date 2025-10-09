const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  emailContent: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'In-Progress', 'Resolved'],
    default: 'New',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('report', ReportSchema);
