const db = require('../../server/config/db');
const User = require('../../server/models/User');
const bcrypt = require('bcryptjs');

exports.handler = async function (event, context) {
  try {
    // 1. Check database connection
    await new Promise((resolve, reject) => {
      db.get('SELECT 1', (err) => {
        if (err) return reject(new Error('Database connection failed'));
        resolve();
      });
    });

    // 2. Attempt to create a test user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('testpassword123', salt);
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: `test-${Date.now()}@example.com`,
      password: hashedPassword,
      role: 'user',
      department: 'Testing',
    };

    const result = await User.create(testUser);

    if (!result || !result.id) {
      throw new Error('User creation failed: No ID returned.');
    }

    // 3. Attempt to find the created user
    const foundUser = await User.findById(result.id);
    if (!foundUser || foundUser.id !== result.id) {
      throw new Error('User verification failed: Could not find created user.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        status: 'Success',
        message: 'Database connection, user creation, and user retrieval are all working correctly.',
        createdUserId: result.id
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        status: 'Failure',
        message: 'An error occurred during the database test.',
        error: err.message 
      }),
    };
  }
};
