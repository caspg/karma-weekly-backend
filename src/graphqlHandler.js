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

function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(body),
  };
}

function createErrorResponse(error) {
  const statusCode = error.responseStatusCode || 500;
  const message = error.message || 'Internal server error';

  return createResponse(statusCode, { message });
}

function graphqlHandler(event, context, callback) {
  const headers = prase(event.headers);
  const body = prase(event.body);

  return graphqlService.runQuery(headers, body.query, body.variables)
    .then(resBody => callback(null, createResponse(200, resBody)))
    .catch(createErrorResponse);
}

module.exports = graphqlHandler;


const x = '{"body": \'{"query":"{ user { email } }"}\' }';
