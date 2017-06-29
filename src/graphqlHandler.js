const UserFactory = require('./models/User');

const graphqlServiceFactory = require('./services/graphql');
const usersServiceFactory = require('./services/users');
const authServiceFactory = require('./services/auth');
const dynamoDBFactory = require('./services/dynamoDB');

const dynamoDBService = dynamoDBFactory();
const User = UserFactory(dynamoDBService);
const usersService = usersServiceFactory(User);
const authService = authServiceFactory(usersService);
const graphqlService = graphqlServiceFactory(authService, usersService);

function graphqlHandler(event, context, callback) {
  console.log('Received event:', event);

  return graphqlService.runQuery(event.body.query)
    .then(response => callback(null, response))
    .catch(error => callback(error));
}

module.exports = graphqlHandler;
