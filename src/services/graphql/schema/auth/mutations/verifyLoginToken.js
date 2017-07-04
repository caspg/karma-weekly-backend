const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const VerifyLoginTokenResultType = new GraphQLObjectType({
  name: 'VerifyLoginTokenResult',
  description: 'Result of verifyLoginToken',
  fields: {
    error: { type: GraphQLString },
    status: { type: new GraphQLNonNull(GraphQLInt) },
    longLiveJwt: { type: GraphQLString },
  },
});

function verifyLoginTokenFactory(authService) {
  return ({
    name: 'Verify login token',
    description: 'Verify login token which was send by an email',
    type: VerifyLoginTokenResultType,
    args: {
      loginToken: {
        type: GraphQLString,
      },
    },
    resolve: (_, args) =>
      authService.verifyLoginToken(args.loginToken),
  });
}

module.exports = verifyLoginTokenFactory;
