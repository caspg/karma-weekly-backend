const emailLoginFactory = require('./functions/emailLogin');

function authServiceFactory(usersService) {
  return {
    emailLogin: emailLoginFactory(usersService),
  };
}

module.exports = authServiceFactory;
