if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line global-require
}

const graphqlHandler = require('./src/graphqlHandler');

module.exports.graphql = graphqlHandler;
