const createSendingQueue = require('./functions/createSendingQueue');

// eslint-disable-next-line max-len
function getUsersAndSendNewsletters(usersService, subredditIssuesService, mailerService, utils, sendingQueue) {
  const issueNumber = utils.getCurrentDateString();
  const handleSubredditPromises = [];

  function handleSubreddit(subreddit, email) {
    return subredditIssuesService
      .findOrCreate(subreddit, issueNumber)
      .then((subredditIssue) => {
        sendingQueue.createWorker(() =>
          mailerService.sendSubredditIssue(email, subredditIssue.props)
        );
      });
  }

  function handleUserSubreddits(user) {
    const { subreddits } = user.props;

    if (typeof subreddits === 'undefined' || subreddits.length === 0) {
      return;
    }

    subreddits.forEach((subreddit) => {
      handleSubredditPromises.push(
        handleSubreddit(subreddit, user.props.email)
      );
    });
  }

  usersService
    .getAll()
    .then(users => users.forEach(handleUserSubreddits))
    .then(() => {
      Promise.all(handleSubredditPromises).then(() => {
        sendingQueue.finishWorkersQueue();
      });
    });
}

function sendSubredditNewslettersFactory(
  usersService,
  subredditIssuesService,
  mailerService,
  utils
) {
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
    const sendingQueue = createSendingQueue();

    // eslint-disable-next-line max-len
    getUsersAndSendNewsletters(usersService, subredditIssuesService, mailerService, utils, sendingQueue);

    sendingQueue.startExecutionInterval();
  }

  return sendSubredditNewsletters;
}

module.exports = sendSubredditNewslettersFactory;
