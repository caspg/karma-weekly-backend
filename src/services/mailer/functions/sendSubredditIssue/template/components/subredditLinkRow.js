const row = require('./row');

/**
 * @typedef {Object} LinkObject
 * @property {String} permalink
 * @property {String} title
 * @property {Number} score
 * @property {Number} commentsNum
 */

/**
 *
 * @param {LinkObject} linkObject
 */
function subredditLinkRow(linkObject) {
  const url = `https://www.reddit.com${linkObject.permalink}`;
  const mainRowContent = `<a target="_blank" href="${url}" style="Margin: 0; color: #2199e8; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none;">${linkObject.title}</a>`;
  const secondaryRowContent = `
    <span style="font-size: 14px;">${linkObject.score} points</span>
    <span style="font-size: 14px;">${linkObject.commentsNum} comments</span>
  `;

  const mainRow = row(mainRowContent);
  const secondaryRow = row(secondaryRowContent);

  return row(`
    <div style="margin-bottom: 15px;">
      ${mainRow}
      ${secondaryRow}
    </div>
  `);
}

module.exports = subredditLinkRow;
