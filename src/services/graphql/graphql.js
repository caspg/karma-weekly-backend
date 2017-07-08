const { graphql } = require('graphql');

const schemaFactory = require('./schema');

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
          .then(user => graphql(schema, query, null, { user }, variables))
      ),
  };
}

module.exports = graphqlServiceFactory;
