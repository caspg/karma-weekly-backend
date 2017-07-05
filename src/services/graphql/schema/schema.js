const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const authFactory = require('./auth');
const userFactory = require('./user');

const helloQuery = {
  type: GraphQLString,
  resolve: (_, __, context) => context.user && context.user.email,
};

function schemaFactory(authService, usersService) {
  const auth = authFactory(authService);
  const user = userFactory(usersService);

  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'QueryRoot',
      fields: {
        hello: helloQuery,
        user: user.query,
      },
    }),
    mutation: new GraphQLObjectType({
      name: 'MutationRoot',
      fields: {
        emailLogin: auth.mutations.emailLogin,
        verifyJWT: auth.mutations.verifyJWT,
        addSubreddit: user.mutations.addSubreddit,
      },
    }),
  });
}

module.exports = schemaFactory;
