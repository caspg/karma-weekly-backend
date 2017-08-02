const template = require('./template');

function makeSubject(name, date) {
  return `Karma Weekly - ${date} - r/${name}`;
}

function sendSubredditIssueFactory(emailProvider) {
  /**
   * @typedef {Object} LinkObject
   * @property {String} permalink
   * @property {String} title
   * @property {Number} score
   * @property {Number} commentsNum
   */

  /**
   * @typedef {Object} SubredditIssue
   * @property {String} name
   * @property {String} date
   * @property {LinkObject[]} links
   */

  /**
   *
   * @param {String} email
   * @param {SubredditIssue} subredditIssue
   *
   * @returns {Promise}
   */

  function sendSubredditIssue(email, subredditIssue) {
    const emailTo = [email];
    const subject = makeSubject(subredditIssue.name, subredditIssue.date);
    const body = {
      htmlBody: template(subredditIssue),
    };

    return emailProvider.sendEmail(emailTo, subject, body);
  }

  return sendSubredditIssue;
}

module.exports = sendSubredditIssueFactory;
