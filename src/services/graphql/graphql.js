const { graphql } = require('graphql');

const schema = require('./schema');

const graphqlService = {
  runQuery: query => graphql(schema, query),
};

module.exports = graphqlService;
