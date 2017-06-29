const graphqlServiceFactory = require('./services/graphql');
const usersServiceFactory = require('./services/users');
const authServiceFactory = require('./services/auth');
const dynamoDBFactory = require('./services/dynamoDB');

const dynamoDB = dynamoDBFactory();
const usersService = usersServiceFactory(dynamoDB);
const authService = authServiceFactory(usersService);
const graphqlService = graphqlServiceFactory(authService, usersService);

function graphqlHandler(event, context, callback) {
  console.log('Received event:', event);

  return graphqlService.runQuery(event.body.query)
    .then(response => callback(null, response))
    .catch(error => callback(error));
}

module.exports = graphqlHandler;
