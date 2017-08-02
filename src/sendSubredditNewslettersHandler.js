const UserFactory = require('./models/User');
const SubredditIssueFactory = require('./models/SubredditIssue');

const usersServiceFactory = require('./services/users');
const dynamoDBFactory = require('./services/dynamoDB');
const sendSubredditNewslettersFactory = require('./services/sendSubredditNewsletters');
const subredditIssuesServiceFactory = require('./services/subredditIssues');
const redditServicesFactory = require('./services/reddit');
const emailProviderFactory = require('./services/mailer/emailProvider');
const mailerServiceFactory = require('./services/mailer');

const getJsonContent = require('./utils/getJsonContent');
const getCurrentDateString = require('./utils/getCurrentDateString');

const dynamoDBService = dynamoDBFactory();

const User = UserFactory(dynamoDBService);
const SubredditIssue = SubredditIssueFactory(dynamoDBService);

const usersService = usersServiceFactory(User);
const redditServices = redditServicesFactory({ getJsonContent });
const subredditIssuesService = subredditIssuesServiceFactory(SubredditIssue, redditServices);
const emailProvider = emailProviderFactory();
const mailerService = mailerServiceFactory(emailProvider);

const sendSubredditNewsletters = sendSubredditNewslettersFactory(
  usersService,
  subredditIssuesService,
  mailerService,
  { getCurrentDateString }
);

function sendSubredditNewslettersHandler() {
  sendSubredditNewsletters();
}

module.exports = sendSubredditNewslettersHandler;
