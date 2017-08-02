const findOrCreateSubredditIssueFactory = require('./functions/findOrCreateSubredditIssue');

function subredditIssuesFactory(SubredditIssue, redditServices) {
  if (!SubredditIssue) {
    throw Error('"SubredditIssue" model must be provided to subredditIssues service.');
  }

  if (!redditServices) {
    throw Error('"SubredditIssue" model must be provided to subredditIssues service.');
  }

  return {
    findOrCreate: findOrCreateSubredditIssueFactory(SubredditIssue, redditServices),
  };
}

module.exports = subredditIssuesFactory;
