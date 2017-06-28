const { graphql } = require('graphql');

const schemaFactory = require('./schema');

function graphqlServiceFactory(authService) {
  if (!authService) {
    throw Error('authService must be provided for graphqlServiceFactory.');
  }

  const schema = schemaFactory(authService);

  return {
    runQuery: query => graphql(schema, query),
  };
}

module.exports = graphqlServiceFactory;
