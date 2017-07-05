function removeItemFactory(dynamoDBService, UserEntity, tableName) {
  /**
   * @param {object} key
   */
  function removeItem(key) {
    const dynamoParams = { TableName: tableName, Key: key };
    const dynamoDBClient = dynamoDBService.client;

    return dynamoDBClient
      .delete(dynamoParams)
      .promise();
  }

  return removeItem;
}

module.exports = removeItemFactory;
