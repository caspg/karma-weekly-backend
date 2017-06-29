const AWS = require('aws-sdk');

const preapreUpdateExpression = require('./functions/preapreUpdateExpression');

function dynamoDBFactory() {
  AWS.config.setPromisesDependency(Promise);
  const client = new AWS.DynamoDB.DocumentClient();

  return {
    client,
    preapreUpdateExpression,
  };
}

module.exports = dynamoDBFactory;
