const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const addSubredditFactory = require('./mutations/addSubreddit');
const removeSubredditFactory = require('./mutations/removeSubreddit');
const removeUserFactory = require('./mutations/removeUser');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    email: { type: GraphQLString },
    subreddits: { type: new GraphQLList(GraphQLString) },
  },
});

const emptyResponse = { email: null };

function userResolver(context, usersService) {
  const { user } = context;

  if (!user || !user.email) {
    return emptyResponse;
  }

  return usersService
    .findUser(user.email)
    .then(usersService.validateUser)
    .then(userEntity => userEntity.props)
    .catch(() => emptyResponse);
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
