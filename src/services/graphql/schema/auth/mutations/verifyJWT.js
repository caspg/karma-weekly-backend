const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const verifyJWTResultType = new GraphQLObjectType({
  name: 'VerifyLoginTokenResult',
  description: 'Result of verifyLoginToken',
  fields: {
    error: { type: GraphQLString },
    status: { type: new GraphQLNonNull(GraphQLInt) },
    longLiveJwt: { type: GraphQLString },
  },
});

function verifyJWTFactory(authService) {
  return ({
    name: 'Verify login token',
    description: 'Verify login token which was send by an email',
    type: verifyJWTResultType,
    args: {
      token: {
        type: GraphQLString,
      },
    },
    resolve: (_, args) =>
      authService.verifyJWT(args.token),
  });
}

module.exports = verifyJWTFactory;
