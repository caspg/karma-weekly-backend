const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const addSubredditFactory = require('./mutations/addSubreddit');
const removeSubredditFactory = require('./mutations/removeSubreddit');
const removeUserFactory = require('./mutations/removeUser');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    subreddits: { type: new GraphQLList(GraphQLString) },
  },
});

function userResolver(context, usersService) {
  const { user } = context;

  if (!user || !user.email) {
    return { email: null };
  }

  return usersService
    .findUser(user.email)
    .then(userEntity => userEntity.props);
}

function userFactory(usersService) {
  return {
    query: {
      name: 'UserQuery',
      description: 'Get user details',
      type: UserType,
      resolve: (_, __, context) =>
        userResolver(context, usersService),
    },
    mutations: {
      addSubreddit: addSubredditFactory(usersService),
      removeSubreddit: removeSubredditFactory(usersService),
      removeUser: removeUserFactory(usersService),
    },
  };
}

module.exports = userFactory;
