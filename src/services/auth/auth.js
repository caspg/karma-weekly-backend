const emailLoginFactory = require('./functions/emailLogin');

function authServiceFactory(usersService, mailerService) {
  return {
    emailLogin: emailLoginFactory(usersService, mailerService),
  };
}

module.exports = authServiceFactory;
