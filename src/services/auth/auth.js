const emailLoginFactory = require('./functions/emailLogin');
const verifyJWTFactory = require('./functions/verifyJWT');
const verifyHeader = require('./functions/verifyHeader');

function authServiceFactory(usersService, mailerService) {
  if (!usersService) {
    throw Error('usersService must be provided for authServiceFactory.');
  }

  if (!mailerService) {
    throw Error('mailerService must be provided for authServiceFactory.');
  }

  return {
    emailLogin: emailLoginFactory(usersService, mailerService),
    verifyJWT: verifyJWTFactory(usersService),
    verifyHeader,
  };
}

module.exports = authServiceFactory;
