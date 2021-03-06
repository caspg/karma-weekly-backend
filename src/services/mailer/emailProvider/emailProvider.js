const AWS = require('aws-sdk');

const makeEmailBody = require('./makeEmailBody');

function sendEmailFactory(sesClient) {
  /**
   * @param {string[]} emailTo
   * @param {string} subject
   * @param {object} body { textBody, htmlBody }
   * @returns {promise}
   */
  function sendEmail(emailTo, subject, body) {
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
        Body: makeEmailBody(body),
      },
      Source: sourceEmail,
      ReturnPath: returnPath,
    };

    return sesClient
      .sendEmail(params)
      .promise()
      .then((response) => { console.log(response); return response; });
  }

  return sendEmail;
}

function emailProviderFactory() {
  AWS.config.setPromisesDependency(Promise);
  const sesClient = new AWS.SES();

  return { sendEmail: sendEmailFactory(sesClient) };
}

module.exports = emailProviderFactory;
