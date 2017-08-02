function findSubredditIssueFactory(SubredditIssue) {
  /**
   *
   * @param {String} name
   * @param {String} date Subreddit Issue date
   * @returns {Promise.<SubredditIssueEntity| null>}
   */
  function findSubredditIssue(name, date) {
    return SubredditIssue.read({ name, date });
  }

  return findSubredditIssue;
}

module.exports = findSubredditIssueFactory;
