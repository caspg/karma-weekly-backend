const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const AddSubredditResultType = new GraphQLObjectType({
  name: 'AddSubredditResult',
  fields: {
    error: { type: GraphQLString },
    status: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

function addSubredditFactory(userService) {
  return ({
    name: 'AddSubreddit',
    description: 'Add user\'s subreddit',
    type: AddSubredditResultType,
    args: {
      subreddit: { type: GraphQLString },
    },
    resolve: (_, args, { user }) => {
      if (!user || !user.email) {
        return { status: 401, error: 'unauthorized' };
      }

      return userService.addSubreddit(user.email, args.subreddit);
    },
  });
}

module.exports = addSubredditFactory;
