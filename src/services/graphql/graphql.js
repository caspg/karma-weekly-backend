const { graphql } = require('graphql');

const schema = require('./schema');

function runQuery(query) {
  return graphql(schema, query);
}

const graphqlService = { runQuery };

module.exports = graphqlService;
