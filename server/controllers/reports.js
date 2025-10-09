const { validationResult } = require('express-validator');
const Report = require('../models/Report');

// @desc    Create a new report
// @access  Private
exports.createReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { emailContent } = req.body;

  try {
    const newReport = new Report({
      emailContent,
      user: req.user.id,
    });

    const report = await newReport.save();
    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all reports
// @access  Private (for Admins)
exports.getReports = async (req, res) => {
  try {
    // TODO: Add role check to ensure only Admins can access this
    const reports = await Report.find().sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
