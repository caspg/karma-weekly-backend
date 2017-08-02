/**
 * @param {String} name
 * @param {String} date
 */
function header(name, date) {
  const mainText = `Karma Weekly | ${date}`;
  const secondaryText = `r/${name}`;

  return `
    <h5 class="text-center" style="Margin: 0; Margin-bottom: 10px; color: inherit; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 0; text-align: center; word-wrap: normal;">${mainText}</h5>
    <h4 class="text-center" style="Margin: 0; Margin-bottom: 10px; color: inherit; font-family: Helvetica, Arial, sans-serif; font-size: 24px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 0; text-align: center; word-wrap: normal;">${secondaryText}</h4>
  `;
}

module.exports = header;
