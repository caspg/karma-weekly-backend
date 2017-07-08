const sendLoginUrlFactory = require('./functions/sendLoginUrl');

function mailerFactory(emailProvider) {
  return {
    sendLoginEmail: sendLoginUrlFactory(emailProvider),
  };
}

module.exports = mailerFactory;
