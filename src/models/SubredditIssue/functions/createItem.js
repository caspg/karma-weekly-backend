function createItemFactory(dynamoDBService, SubredditIssueEntity, tableName) {
  return function createItem(params) {
    const dynamoParams = { TableName: tableName, Item: params };
    const dynamoDBClient = dynamoDBService.client;

    return dynamoDBClient
      .put(dynamoParams)
      .promise()
      .then(() => new SubredditIssueEntity(params));
  };
}

module.exports = createItemFactory;
