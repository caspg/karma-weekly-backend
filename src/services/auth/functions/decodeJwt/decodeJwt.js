const jwt = require('jsonwebtoken');

/**
 * @param {string} token json web token
 * @returns {promise.<string>}
 */
function decodeJwt(token) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw Error('JWT_SECRET environment variable must be provided!');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = decodeJwt;
