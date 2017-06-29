function readItemFactory(dynamoDBService, UserEntity, tableName) {
  return function readItem(params) {
    const dynamoParams = { TableName: tableName, Key: params };

    return dynamoDBService
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
