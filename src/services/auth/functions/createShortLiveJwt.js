const createJwt = require('./createJwt');

/**
 * @param {string} email
 * @returns {string}
 */
function createShortLiveJwt(email) {
  // 5 minutes from now
  const expiration = Math.floor(Date.now() / 1000) + (60 * 5);
  const payload = { email };

  return createJwt(payload, expiration);
}

module.exports = createShortLiveJwt;
