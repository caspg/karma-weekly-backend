const createSubredditIssueFactory = require('./functions/createSubredditIssue');

function subredditIssuesFactory(SubredditIssue) {
  if (!SubredditIssue) {
    throw Error('"SubredditIssue" model must be provided to subredditIssues service.');
  }

  return {
    create: createSubredditIssueFactory(SubredditIssue),
  };
}

module.exports = subredditIssuesFactory;
