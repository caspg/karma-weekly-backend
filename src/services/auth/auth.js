const emailLoginFactory = require('./functions/emailLogin');

function authServiceFactory(usersService, mailerService) {
  if (!usersService) {
    throw Error('usersService must be provided for authServiceFactory.');
  }

  if (!mailerService) {
    throw Error('mailerService must be provided for authServiceFactory.');
  }

  return {
    emailLogin: emailLoginFactory(usersService, mailerService),
  };
}

module.exports = authServiceFactory;
