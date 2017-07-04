const emailLoginFactory = require('./functions/emailLogin');
const verifyLoginTokenFactory = require('./functions/verifyLoginToken');

function authServiceFactory(usersService, mailerService) {
  if (!usersService) {
    throw Error('usersService must be provided for authServiceFactory.');
  }

  if (!mailerService) {
    throw Error('mailerService must be provided for authServiceFactory.');
  }

  return {
    emailLogin: emailLoginFactory(usersService, mailerService),
    verifyLoginToken: verifyLoginTokenFactory(usersService),
  };
}

module.exports = authServiceFactory;
