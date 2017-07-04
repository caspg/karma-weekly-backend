const emailLoginFactory = require('./mutations/emailLogin');
const verifyJWTFactory = require('./mutations/verifyJWT');

function authFactory(authService) {
  return {
    mutations: {
      emailLogin: emailLoginFactory(authService),
      verifyJWT: verifyJWTFactory(authService),
    },
  };
}

module.exports = authFactory;
