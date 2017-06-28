const emailLogin = require('./mutations/emailLogin');

function authFactory(authService) {
  return {
    mutations: {
      emailLogin: emailLogin(authService),
    },
  };
}

module.exports = authFactory;
