require('dotenv').config();
const connectDB = require('../../server/config/db');
const Report = require('../../server/models/Report');
const { authenticate } = require('../utils/auth');

const createReportHandler = async (event, context) => {
  await connectDB();

  const { emailContent } = JSON.parse(event.body);

  try {
    const newReport = new Report({
      emailContent,
      user: event.user.id,
    });

    const report = await newReport.save();

    return {
      statusCode: 200,
      body: JSON.stringify(report),
    };
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Server Error' }),
    };
  }
};

exports.handler = authenticate(createReportHandler);
