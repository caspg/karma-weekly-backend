function htmlBody(loginUrl) {
  const stringBody = `
Hello!

You asked us to send you a magic link for quick login to Karma Weekly.
Please, click the link below:

${loginUrl}

Cheers,
Karma Weekly Team.
  `;

  return stringBody;
}

function sendLoginUrlFactory(emailProvider) {
  /**
   * @param {string} email
   * @param {string} loginUrl
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
