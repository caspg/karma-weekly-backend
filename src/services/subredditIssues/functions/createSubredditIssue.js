function createSubredditIssueFactory(SubredditIssue) {
  /**
   * @typedef {Object} SubredditLink
   * @property {String} title
   * @property {String} permalink
   * @property {Number} commentsNum
   * @property {Number} score
   */

  /**
   * Create subreddit issue entry in DB and return Promise.
   * @param {String} name
   * @param {Number} number
   * @param {SubredditLink[]} links
   * @returns {Promise}
   */
  function createSubredditIssue(name, number, links) {
    const itemParams = { name, number, links };

    return SubredditIssue.create(itemParams);
  }

  return createSubredditIssue;
}

module.exports = createSubredditIssueFactory;
