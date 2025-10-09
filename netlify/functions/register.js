require('dotenv').config();
const User = require('../../server/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handler = async function (event, context) {
  const { firstName, lastName, email, password, role, department } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    User.findByEmail(email, async (err, user) => {
      if (err) {
        return resolve({ statusCode: 500, body: JSON.stringify({ msg: 'Server error' }) });
      }
      if (user) {
        return resolve({ statusCode: 400, body: JSON.stringify({ msg: 'User already exists' }) });
      }

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

      User.create(newUser, (err, result) => {
        if (err) {
          return resolve({ statusCode: 500, body: JSON.stringify({ msg: 'Server error' }) });
        }

        const payload = {
          user: {
            id: result.id,
            role: newUser.role,
          },
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

        resolve({
          statusCode: 200,
          body: JSON.stringify({ token }),
        });
      });
    });
  });
};
