const sendLoginUrlFactory = require('./functions/sendLoginUrl');
const sendSubredditIssueFactory = require('./functions/sendSubredditIssue');

function mailerFactory(emailProvider) {
  return {
    sendLoginEmail: sendLoginUrlFactory(emailProvider),
    sendSubredditIssue: sendSubredditIssueFactory(emailProvider),
  };
}

module.exports = mailerFactory;
