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

function validateEmail(usersService, email) {
  return usersService
    .findUser(email)
    .then((user) => {
      if (!user) {
        throw Error('user was not found in db');
      }

      return email;
    });
}

function verifyJWTFactory(usersService) {
  /**
   * Verify short live login token.
   * @param {string} loginToken
   */
  function verifyJWT(token) {
    return decodeJwt(token)
      .then(decoded => decoded.email)
      .then(email => validateEmail(usersService, email))
      .then(email => createLongLiveJwt(email))
      .then(successResponse)
      .catch(errorResponse);
  }

  return verifyJWT;
}

module.exports = verifyJWTFactory;
