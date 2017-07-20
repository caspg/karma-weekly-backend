const UserFactory = require('./models/User');
const usersServiceFactory = require('./services/users');
const dynamoDBFactory = require('./services/dynamoDB');
const sendSubredditNewslettersFactory = require('./services/sendSubredditNewsletters');

const dynamoDBService = dynamoDBFactory();
const User = UserFactory(dynamoDBService);
const usersService = usersServiceFactory(User);

const sendSubredditNewsletters = sendSubredditNewslettersFactory(usersService);

function sendSubredditNewslettersHandler() {
  sendSubredditNewsletters();
}

module.exports = sendSubredditNewslettersHandler;
