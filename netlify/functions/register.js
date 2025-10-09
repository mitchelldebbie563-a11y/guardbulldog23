require('dotenv').config();
const connectDB = require('../../server/config/db');
const User = require('../../server/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = async function (event, context) {
  // Connect to database
  await connectDB();

  const { name, email, password } = JSON.parse(event.body);

  try {
    let user = await User.findOne({ email });

    if (user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ msg: 'User already exists' }),
      };
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Server error' }),
    };
  }
};
