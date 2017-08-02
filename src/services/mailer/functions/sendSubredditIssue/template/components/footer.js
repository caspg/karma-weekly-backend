const row = require('./row');

function footer(unsubscribeUrl) {
  const footerContent = `<p style="Margin: 0; Margin-bottom: 10px; margin-top: 30px !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;"><small style="color: #cacaca; font-size: 80%;">You received this email because you're signed up to get weekly updates from us. <a href="${unsubscribeUrl}" style="Margin: 0; color: #2199e8; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none;">Click here to unsubscribe.</a></small></p>`;

  return row(footerContent);
}

module.exports = footer;
