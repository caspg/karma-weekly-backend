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

const emailLogin = {
  name: 'Email login mutation',
  description: 'Send user email with login link.',
  type: EmailLoginResultType,
  args: {
    email: {
      type: GraphQLString,
    },
  },
  resolve: (_, args) => {
    throw Error(`Implement emailLogin resolver! Email provided: ${args.email}`);
  },
};

const authMutations = {
  emailLogin,
};

module.exports.mutations = authMutations;
