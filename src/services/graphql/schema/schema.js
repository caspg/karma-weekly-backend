const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const authFactory = require('./auth');

const helloQuery = {
  type: GraphQLString,
  resolve: (_, __, context) => context.user && context.user.email,
};

function schemaFactory(authService) {
  const auth = authFactory(authService);

  return new GraphQLSchema({
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
        verifyJWT: auth.mutations.verifyJWT,
      },
    }),
  });
}

module.exports = schemaFactory;
