require('dotenv').config();
const connectDB = require('../../server/config/db');
const Report = require('../../server/models/Report');
const { authenticate } = require('../utils/auth');

const getRecentActivity = async (event, context) => {
  await connectDB();

  try {
    const userId = event.user.id;

    const recentReports = await Report.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    const activities = recentReports.map(report => ({
      id: report._id,
      type: 'report_submitted',
      title: 'Reported suspicious email',
      description: `Status: ${report.status}`,
      timestamp: report.date,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(activities),
    };
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Server Error' }),
    };
  }
};

exports.handler = authenticate(getRecentActivity);
