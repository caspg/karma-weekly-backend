const emailLoginFactory = require('./mutations/emailLogin');
const verifyLoginTokenFactory = require('./mutations/verifyLoginToken');

function authFactory(authService) {
  return {
    mutations: {
      emailLogin: emailLoginFactory(authService),
      verifyLoginToken: verifyLoginTokenFactory(authService),
    },
  };
}

module.exports = authFactory;
