require('dotenv').config();
require('dotenv').config({ path: '../../.env' });
const User = require('../../server/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = async function (event, context) {
  const { firstName, lastName, email, password, department } = JSON.parse(event.body);

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return { statusCode: 400, body: JSON.stringify({ msg: 'User already exists' }) };
    }

    // Check if this is the first user
    const firstUser = await User.findFirstUser();
    const role = firstUser ? 'user' : 'super_admin';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      department,
    };

    const createdUser = await User.create(newUser);

    const payload = {
      user: {
        id: createdUser.id,
        role: createdUser.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (err) {
    console.error('Registration Error:', err);
    return { statusCode: 500, body: JSON.stringify({ msg: 'Server error during registration.' }) };
  }
};
