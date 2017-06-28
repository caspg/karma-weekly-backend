const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const auth = require('./auth');

const helloQuery = {
  type: GraphQLString,
  resolve: () => 'Hello, World!',
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'QueryRoot',
    fields: {
      hello: helloQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'MutationRoot',
    fields: {
      emailLogin: auth.mutations.emailLogin,
    },
  }),
});

module.exports = schema;
