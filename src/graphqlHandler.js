const graphqlService = require('./services/graphql');

function graphqlHandler(event, context, callback) {
  console.log('Received event', event);

  return graphqlService.runQuery(event.body.query)
    .then(response => callback(null, response))
    .catch(error => callback(error));
}

module.exports = graphqlHandler;
