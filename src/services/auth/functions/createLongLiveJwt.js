const createJwt = require('./createJwt');

/**
 * @param {string} email
 * @returns {string}
 */
function createLongLiveJwt(email) {
  // 1 day from now
  const daysFromNow = 1;
  const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * daysFromNow);
  const payload = { email };

  return createJwt(payload, expiration);
}

module.exports = createLongLiveJwt;
