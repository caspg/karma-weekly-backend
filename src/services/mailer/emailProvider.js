const AWS = require('aws-sdk');

function sendEmailFactory(sesClient) {
  /**
   * @param {string[]} emailTo
   * @param {string} subject
   * @param {string} htmlBody
   */
  function sendEmail(emailTo, subject, htmlBody) {
    const sourceEmail = process.env.AWS_SES_SOURCE_EMAIL;
    const returnPath = process.env.AWS_SES_RETURN_PATH;

    if (!sourceEmail) {
      throw Error('AWS_SES_SOURCE_EMAIL env variable must be provided.');
    }

    if (!returnPath) {
      throw Error('AWS_SES_RETURN_PATH env variable must be provided.');
    }

    const params = {
      Destination: {
        ToAddresses: emailTo,
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody,
          },
        },
      },
      Source: sourceEmail,
      ReturnPath: returnPath,
    };

    return sesClient
      .sendEmail(params)
      .promise();
  }

  return sendEmail;
}

function emailProviderFactory() {
  AWS.config.setPromisesDependency(Promise);
  const sesClient = new AWS.SES();

  return { sendEmail: sendEmailFactory(sesClient) };
}

module.exports = emailProviderFactory;
