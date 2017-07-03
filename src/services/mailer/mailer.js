const sendLoginUrlFactory = require('./functions/sendLoginUrl');

function mailerFactory(emailProvider) {
  return {
    sendEmail: sendLoginUrlFactory(emailProvider),
  };
}

module.exports = mailerFactory;
