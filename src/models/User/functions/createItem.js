function createItemFactory(dynamoDBService, UserEntity, tableName) {
  return function createItem(params) {
    const dynamoParams = { TableName: tableName, Item: params };
    const dynamoDBClient = dynamoDBService.client;

    return dynamoDBClient
      .put(dynamoParams)
      .promise()
      .then(() => new UserEntity(params));
  };
}

module.exports = createItemFactory;
