function readItemFactory(dynamoDBService, SubredditIssueEntity, tableName) {
  /**
   *
   * @param {Object} params
   * @param {String} params.name
   * @param {String} params.date
   *
   * @returns {Promise.<SubredditIssueEntity | null>}
   */
  function readItem(params) {
    const dynamoParams = { TableName: tableName, Key: params };
    const dynamoDBClient = dynamoDBService.client;

    return dynamoDBClient
      .get(dynamoParams)
      .promise()
      .then((data) => {
        const item = data.Item;
        if (!item) return null;

        return new SubredditIssueEntity(item);
      });
  }

  return readItem;
}

module.exports = readItemFactory;
