function getUsersAndSendNewsletters(usersService, subredditIssuesService, utils) {
  const issueNumber = utils.getCurrentDateString();

  function handleSubreddit(subreddit, email) {
    subredditIssuesService
      .findOrCreate(subreddit, issueNumber)
      .then(subredditIssue => console.log(subredditIssue));
      // TODO send email to user
  }

  function handleUserSubreddits(user) {
    const { subreddits } = user.props;

    if (typeof subreddits === 'undefined' || subreddits.length === 0) {
      return;
    }

    subreddits.forEach(subreddit =>
      handleSubreddit(subreddit, user.props.email)
    );
  }

  usersService
    .getAll()
    .then(users => users.forEach(handleUserSubreddits));
}

function sendSubredditNewslettersFactory(usersService, subredditIssuesService, utils) {
  if (!usersService) {
    throw Error('usersService is required in sendSubredditNewsletters.');
  }

  if (!subredditIssuesService) {
    throw Error('subredditIssuesService is required in sendSubredditNewsletters.');
  }

  if (!utils || !utils.getCurrentDateString) {
    throw Error('utils module is required in sendSubredditNewsletters.');
  }

  function sendSubredditNewsletters() {
    getUsersAndSendNewsletters(usersService, subredditIssuesService, utils);
  }

  return sendSubredditNewsletters;
}

module.exports = sendSubredditNewslettersFactory;
