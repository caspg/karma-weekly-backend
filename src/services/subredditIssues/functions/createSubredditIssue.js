function createSubredditIssueFactory(SubredditIssue, redditServices) {
  /**
   * Create subreddit issue entry in DB and return Promise.
   * @param {String} name
   * @param {String} date
   * @returns {Promise.<SubredditIssueEntity>}
   */
  function createSubredditIssue(name, date) {
    return redditServices
      .getTopFromLastWeek(name)
      .then((links) => {
        const itemParams = { name, date, links };

        return SubredditIssue.create(itemParams);
      });
  }

  return createSubredditIssue;
}

module.exports = createSubredditIssueFactory;
