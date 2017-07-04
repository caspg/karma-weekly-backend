const decodeJwt = require('./decodeJwt');

function isCorrectHeader(headers) {
  return headers && headers.authorization;
}

function isCorrectHeaderFormat(parts) {
  return (parts.length === 2 && parts[0] === 'Bearer');
}

function makeHeaderParts(headers) {
  const authHeader = headers.authorization || headers.Authorization;
  return authHeader.split(' ');
}

function nullResult() {
  return Promise.resolve(null);
}

/**
 * @param {object} headers
 * @returns {promise.<object|null>}
 */
function verifyHeader(headers) {
  if (!isCorrectHeader(headers)) return nullResult();

  const parts = makeHeaderParts(headers);
  if (!isCorrectHeaderFormat(parts)) return nullResult();

  const token = parts[1];

  return decodeJwt(token)
    .then(decoded => ({ email: decoded.email }))
    .catch(nullResult);
}

module.exports = verifyHeader;
