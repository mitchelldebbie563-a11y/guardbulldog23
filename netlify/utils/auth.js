const jwt = require('jsonwebtoken');

const authenticate = (handler) => async (event, context) => {
  const token = event.headers['x-auth-token'];

  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: 'No token, authorization denied' }),
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    event.user = decoded.user;
    return handler(event, context);
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: 'Token is not valid' }),
    };
  }
};

const authorizeAdmin = (handler) => async (event, context) => {
  if (event.user.role !== 'Admin') {
    return {
      statusCode: 403,
      body: JSON.stringify({ msg: 'Access denied. Admins only.' }),
    };
  }
  return handler(event, context);
};

module.exports = { authenticate, authorizeAdmin };
