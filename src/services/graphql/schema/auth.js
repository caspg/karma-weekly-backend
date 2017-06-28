const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const EmailLoginResultType = new GraphQLObjectType({
  name: 'EmailLoginResult',
  description: 'Result of email login.',
  fields: {
    error: { type: GraphQLString },
    status: { type: GraphQLInt },
  },
});

function emailLogin(authService) {
  return ({
    name: 'Email login mutation',
    description: 'Send user email with login link.',
    type: EmailLoginResultType,
    args: {
      email: {
        type: GraphQLString,
      },
    },
    resolve: (_, args) =>
      authService.emailLogin(args.email),
  });
}

function authFactory(authService) {
  return {
    mutations: {
      emailLogin: emailLogin(authService),
    },
  };
}

module.exports = authFactory;
