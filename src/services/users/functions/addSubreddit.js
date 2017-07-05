const findUserFactory = require('./findUser');
const updateUserFactory = require('./updateUser');

function successResponse() {
  return { status: 200, error: null };
}

function errorResponse(error) {
  return { status: 500, error: error.message || 'internal server error' };
}

/**
 * Add subreddit to user's subreddit array.
 *
 * @param {string[]} userSubreddits
 * @param {string} subreddit
 * @returns {string[]}
 */
function updateSubreddits(userSubreddits, subreddit) {
  if (!userSubreddits) {
    return [subreddit];
  }

  return (userSubreddits.find(s => s === subreddit)) ?
    userSubreddits :
    userSubreddits.concat(subreddit);
}

function addSubredditFactory(User) {
  const findUser = findUserFactory(User);
  const updateUser = updateUserFactory(User);

  /**
   * Adds new subreddit to user's subreddits list.
   *
   * @param {string} email
   * @param {string} subreddit
   * @returns {promise.<object>}
   */
  function addSubreddit(email, subreddit) {
    if (!email) {
      throw Error('"email must be provided to addSubreddit');
    }

    if (!subreddit) {
      throw Error('"subreddit must be provided to addSubreddit');
    }

    return findUser(email)
      .then(user => user.subreddits)
      .then(subreddits => updateSubreddits(subreddits, subreddit))
      .then(subreddits => updateUser({ email }, { subreddits }))
      .then(successResponse)
      .catch(errorResponse);
  }

  return addSubreddit;
}

module.exports = addSubredditFactory;
