const UserFactory = require('./models/User');

const graphqlServiceFactory = require('./services/graphql');
const usersServiceFactory = require('./services/users');
const authServiceFactory = require('./services/auth');
const dynamoDBFactory = require('./services/dynamoDB');
const emailProviderFactory = require('./services/mailer/emailProvider');
const mailerServiceFactory = require('./services/mailer');

const emailProvider = emailProviderFactory();
const mailerService = mailerServiceFactory(emailProvider);
const dynamoDBService = dynamoDBFactory();
const User = UserFactory(dynamoDBService);
const usersService = usersServiceFactory(User);
const authService = authServiceFactory(usersService, mailerService);
const graphqlService = graphqlServiceFactory(authService);

function graphqlHandler(event, context, callback) {
  return graphqlService.runQuery(event.headers, event.body.query)
    .then(response => callback(null, response))
    .catch(error => callback(error));
}

module.exports = graphqlHandler;
