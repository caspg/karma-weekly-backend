const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const helloQuery = {
  type: GraphQLString,
  resolve: () => 'Hello, World!',
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    fields: {
      hello: helloQuery,
    },
  }),
});

module.exports = schema;
