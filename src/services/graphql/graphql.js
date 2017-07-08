const { graphql, formatError } = require('graphql');

const schemaFactory = require('./schema');

function formatErrorResuls(result) {
  if (result && result.errors) {
    return Object.assign({}, result, {
      errors: result.errors.map(formatError),
    });
  }

  return result;
}

function graphqlServiceFactory(authService, usersService) {
  if (!authService) {
    throw Error('authService must be provided for graphqlServiceFactory.');
  }

  if (!usersService) {
    throw Error('usersService must be provided for graphqlServiceFactory.');
  }

  const schema = schemaFactory(authService, usersService);

  return {
    runQuery: (headers, query, variables) => (
        authService
          .verifyHeader(headers)
          .then(user => graphql(schema, null, null, { user }, variables))
          .then(formatErrorResuls)
      ),
  };
}

module.exports = graphqlServiceFactory;
