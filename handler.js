if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line global-require
}

const graphqlHandler = require('./src/graphqlHandler');
const sendSubredditNewslettersHandler = require('./src/sendSubredditNewslettersHandler');

module.exports.graphql = graphqlHandler;
module.exports.sendSubredditNewsletters = sendSubredditNewslettersHandler;
