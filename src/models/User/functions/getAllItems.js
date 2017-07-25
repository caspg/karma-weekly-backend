function recursivelyGetAll(dynamoDBClient, initialParams, UserEntity) {
  const allItems = [];

  function scanDynamo(params, handler) {
    return dynamoDBClient
      .scan(params)
      .promise()
      .then(handler);
  }

  function scanHandler(result) {
    const LastEvaluatedKey = result.LastEvaluatedKey;
    allItems.push(...result.Items);

    if (typeof LastEvaluatedKey === 'undefined') {
      return allItems.map(i => new UserEntity(i));
    }

    const updatedParams = Object.assign({}, initialParams, {
      ExclusiveStartKey: LastEvaluatedKey,
    });

    return scanDynamo(updatedParams, scanHandler);
  }

  return scanDynamo(initialParams, scanHandler);
}

function getAllItemsFactory(dynamoDBService, UserEntity, tableName) {
  function getAll() {
    const dynamoDBClient = dynamoDBService.client;
    const dynamoParams = { TableName: tableName };

    return recursivelyGetAll(dynamoDBClient, dynamoParams, UserEntity);
  }

  return getAll;
}

module.exports = getAllItemsFactory;
