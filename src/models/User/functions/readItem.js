function readItemFactory(dynamoDBService, UserEntity, tableName) {
  return function readItem(params) {
    const dynamoParams = { TableName: tableName, Key: params };
    const dynamoDBClient = dynamoDBService.client;

    return dynamoDBClient
      .get(dynamoParams)
      .promise()
      .then((data) => {
        const item = data.Item;
        if (!item) return null;

        return new UserEntity(item);
      });
  };
}

module.exports = readItemFactory;
