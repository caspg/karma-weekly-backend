function htmlBody(loginUrl) {
  const stringBody = `
Hello!

You asked us to send you a magic link for quick login to Karma Weekly.
Please, click the link below:

${loginUrl}

Note: Your magic link will expire in 5 minutes.

Cheers,
Karma Weekly Team.
  `;

  return stringBody;
}

function sendLoginUrlFactory(emailProvider) {
  /**
   * @param {string} email
   * @param {string} loginUrl
   * @returns {promise}
   */
  function sendLoginUrl(email, loginUrl) {
    const emailTo = [email];
    const subject = 'Magic login link for Karma Weekly';
    const textBody = htmlBody(loginUrl);
    const body = { textBody };

    return emailProvider.sendEmail(emailTo, subject, body);
  }

  return sendLoginUrl;
}

module.exports = sendLoginUrlFactory;
