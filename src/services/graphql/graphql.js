const { graphql } = require('graphql');

const schemaFactory = require('./schema');

function graphqlServiceFactory(authService) {
  if (!authService) {
    throw Error('authService must be provided for graphqlServiceFactory.');
  }

  const schema = schemaFactory(authService);

  return {
    runQuery: (headers, query) => (
        authService
          .verifyHeader(headers)
          .then(user => graphql(schema, query, null, { user }))
      ),
  };
}

module.exports = graphqlServiceFactory;
