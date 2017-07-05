const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const RemoveUserResultType = new GraphQLObjectType({
  name: 'RemoveUserResult',
  fields: {
    error: { type: GraphQLString },
    status: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

function removeUserFactory(userService) {
  return ({
    name: 'RemoveUser',
    description: 'Remove user',
    type: RemoveUserResultType,
    resolve: (_, args, { user }) => {
      if (!user || !user.email) {
        return { status: 401, error: 'unauthorized' };
      }

      return userService.removeUser(user.email);
    },
  });
}

module.exports = removeUserFactory;
