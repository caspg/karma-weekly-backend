/**
 * Create Body object for AWS SES params.
 * @param {object} body { textBody, htmlBody }
 */
function makeEmailBody(body) {
  const { textBody, htmlBody } = body;
  const bodyObj = data => ({ Charset: 'UTF-8', Data: data });

  const textBodyObj = textBody ? { Text: bodyObj(textBody) } : null;
  const htmlBodyObj = htmlBody ? { Html: bodyObj(htmlBody) } : null;

  return Object.assign({}, textBodyObj, htmlBodyObj);
}

module.exports = makeEmailBody;
