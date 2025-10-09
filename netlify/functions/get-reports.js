require('dotenv').config();
const connectDB = require('../../server/config/db');
const Report = require('../../server/models/Report');
const { authenticate, authorizeAdmin } = require('../utils/auth');

const getReportsHandler = async (event, context) => {
  await connectDB();

  try {
    const reports = await Report.find().sort({ date: -1 });
    return {
      statusCode: 200,
      body: JSON.stringify(reports),
    };
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Server Error' }),
    };
  }
};

exports.handler = authenticate(authorizeAdmin(getReportsHandler));
