const findUserFactory = require('./findUser');
const updateUserFactory = require('./updateUser');

function successResponse() {
  return { status: 200, error: null };
}

function errorResponse(error) {
  return { status: 500, error: error.message || 'internal server error' };
}

function removeSubredditFactory(User) {
  const findUser = findUserFactory(User);
  const updateUser = updateUserFactory(User);

  function removeSubreddit(email, subreddit) {
    if (!email) {
      throw Error('"email must be provided to addSubreddit');
    }

    if (!subreddit) {
      throw Error('"subreddit must be provided to addSubreddit');
    }

    return findUser(email)
      .then(user => user.props.subreddits)
      .then(subreddits => subreddits.filter(s => s !== subreddit))
      .then(subreddits => updateUser({ email }, { subreddits }))
      .then(successResponse)
      .catch(errorResponse);
  }

  return removeSubreddit;
}

module.exports = removeSubredditFactory;
