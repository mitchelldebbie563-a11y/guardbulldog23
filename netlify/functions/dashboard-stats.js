require('dotenv').config();
const connectDB = require('../../server/config/db');
const Report = require('../../server/models/Report');
const { authenticate } = require('../utils/auth');

const getDashboardStats = async (event, context) => {
  await connectDB();

  try {
    const userId = event.user.id;

    // These are just examples. In a real app, you'd have more complex models and logic.
    const reportsSubmitted = await Report.countDocuments({ user: userId });
    const modulesCompleted = 0; // Placeholder
    const threatsBlocked = 0; // Placeholder
    const securityScore = 0; // Placeholder

    return {
      statusCode: 200,
      body: JSON.stringify({
        reportsSubmitted,
        modulesCompleted,
        threatsBlocked,
        securityScore,
      }),
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Server Error' }),
    };
  }
};

exports.handler = authenticate(getDashboardStats);
