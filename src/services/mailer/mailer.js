function mailerFactory(emailProvider) {
  return {
    sendEmail: emailProvider.sendEmail,
  };
}

module.exports = mailerFactory;
