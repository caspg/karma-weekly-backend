function updateItemFactory(dynamoDBService, UserEntity, tableName) {
  return function updateItem(key, attributes) {
    const {
      updateExpression,
      expressionAttributeValues,
    } = dynamoDBService.preapreUpdateExpression(attributes);

    const dynamoParams = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    const dynamoDBClient = dynamoDBService.client;

    return dynamoDBClient
      .update(dynamoParams)
      .promise()
      .then(d => console.log(d))
      .catch(d => console.log(d));
  };
}

module.exports = updateItemFactory;
