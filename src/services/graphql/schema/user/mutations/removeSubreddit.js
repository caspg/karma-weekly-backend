const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const RemoveSubredditResultType = new GraphQLObjectType({
  name: 'RemoveSubredditResult',
  fields: {
    error: { type: GraphQLString },
    status: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

function removeSubredditFactory(userService) {
  return ({
    name: 'RemoveSubreddit',
    description: 'Remove user\'s subreddit',
    type: RemoveSubredditResultType,
    args: {
      subreddit: { type: GraphQLString },
    },
    resolve: (_, args, { user }) => {
      if (!user || !user.email) {
        return { status: 401, error: 'unauthorized' };
      }

      return userService.removeSubreddit(user.email, args.subreddit);
    },
  });
}

module.exports = removeSubredditFactory;
