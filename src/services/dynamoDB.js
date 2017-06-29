const AWS = require('aws-sdk');

function dynamoDBFactory() {
  return new AWS.DynamoDB.DocumentClient();
}

module.exports = dynamoDBFactory;
