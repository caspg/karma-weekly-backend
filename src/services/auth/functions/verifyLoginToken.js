const decodeJwt = require('./decodeJwt');
const createLongLiveJwt = require('./createLongLiveJwt');

function successResponse(token) {
  return { status: 200, longLiveJwt: token };
}

function errorResponse(error) {
  if (error.message) {
    return { status: 401, error: error.message };
  }

  return { status: 500, error: 'internal server error' };
}

/**
 * Verify short live login token.
 * @param {string} loginToken
 */
function verifyLoginToken(loginToken) {
  // TODO: query DynamoDB with decoded email

  return decodeJwt(loginToken)
    .then(decoded => decoded.email)
    .then(email => createLongLiveJwt(email))
    .then(successResponse)
    .catch(errorResponse);
}

module.exports = verifyLoginToken;
