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
const graphqlService = graphqlServiceFactory(authService, usersService);

/**
 * @param {string|object} event
 */
function prase(obj) {
  if (typeof obj === 'string') {
    return JSON.parse(obj);
  }

  return obj;
}

function graphqlHandler(event, context, callback) {
  const headers = prase(event.headers);
  const body = prase(event.body);

  return graphqlService.runQuery(headers, body.query, body.variables)
    .then((serviceResponse) => {
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        body: JSON.stringify(serviceResponse),
      };

      callback(null, response);
    })
    .catch(error => callback(error));
}

module.exports = graphqlHandler;
