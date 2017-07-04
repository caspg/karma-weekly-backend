const jwt = require('jsonwebtoken');

/**
 *
 * @param {object} payload
 * @param {integer} expiration NumericDate
 */
function createJwt(payload, expiration) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw Error('JWT_SECRET environment variable must be provided!');
  }

  const readyPayload = Object.assign({}, payload, { exp: expiration });

  return jwt.sign(readyPayload, jwtSecret);
}

module.exports = createJwt;
