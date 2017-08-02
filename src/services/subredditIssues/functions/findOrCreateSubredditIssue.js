const findSubredditIssueFactory = require('./findSubredditIssue');
const createSubredditIssueFactory = require('./createSubredditIssue');

function findOrCreateSubredditIssueFactory(SubredditIssue, redditServices) {
  const findSubredditIssue = findSubredditIssueFactory(SubredditIssue);
  const createSubredditIssue = createSubredditIssueFactory(SubredditIssue, redditServices);

  /**
   *
   * @param {String} name
   * @param {String} date
   *
   * @returns {Promise.<SubredditIssueEntity | null>}
   */
  function findOrCreateSubredditIssue(name, date) {
    return findSubredditIssue(name, date).then((subredditIssue) => {
      if (!subredditIssue) {
        return createSubredditIssue(name, date);
      }

      return subredditIssue;
    });
  }

  return findOrCreateSubredditIssue;
}

module.exports = findOrCreateSubredditIssueFactory;
