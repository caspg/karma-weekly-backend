const findUserFactory = require('./findUser');
const updateUserFactory = require('./updateUser');
const validateUser = require('./validateUser');

function successResponse() {
  return { status: 200, error: null };
}

function errorResponse(error) {
  return {
    status: error.status || 500,
    error: error.message || 'internal server error',
  };
}

/**
 * Add subreddit to user's subreddit array.
 *
 * @param {string[]} subreddits
 * @param {string} subreddit
 * @returns {string[]}
 */
function updateSubreddits(subreddits, subreddit) {
  if (!subreddits) {
    return [subreddit];
  }

  return subreddits.concat(subreddit);
}

/**
 * Validate subreddits
 *
 * @param {string[]} subreddits
 * @param {string} subreddit
 * @returns {string[]}
 */
function validateSubreddits(subreddits, subreddit) {
  const subredditExists = subreddits.find(s => s === subreddit);

  if (subredditExists) {
    const error = Error(`"${subreddit}" already exists in user's subreddits`);
    error.status = 422;

    throw error;
  }

  const maxSubredditCount = 10;

  if (subreddits.length >= maxSubredditCount) {
    const error = Error(`You can't add more than ${maxSubredditCount} subreddits.`);
    error.status = 422;

    throw error;
  }

  return subreddits;
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
      .then(validateUser)
      .then(user => user.props.subreddits)
      .then(subreddits => validateSubreddits(subreddits, subreddit))
      .then(subreddits => updateSubreddits(subreddits, subreddit))
      .then(subreddits => updateUser({ email }, { subreddits }))
      .then(successResponse)
      .catch(errorResponse);
  }

  return addSubreddit;
}

module.exports = addSubredditFactory;
