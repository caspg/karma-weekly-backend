const decodeJwt = require('./decodeJwt');

function authHeader(headers) {
  return headers.authorization || headers.Authorization;
}

function isCorrectHeader(headers) {
  return headers && authHeader(headers);
}

function isCorrectHeaderFormat(parts) {
  return (parts.length === 2 && parts[0] === 'Bearer');
}
function makeHeaderParts(headers) {
  return authHeader(headers).split(' ');
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
