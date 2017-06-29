const AWS = require('aws-sdk');

function dynamoDBFactory() {
  AWS.config.setPromisesDependency(Promise);

  return new AWS.DynamoDB.DocumentClient();
}

module.exports = dynamoDBFactory;
