const jwt = require('jsonwebtoken');

/**
 * @param {string} token json web token
 * @returns {object}
 */
function decodeJwt(token) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw Error('JWT_SECRET environment variable must be provided!');
  }

  return jwt.verify(token, jwtSecret);
}

module.exports = decodeJwt;
