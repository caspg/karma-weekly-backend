const SubredditIssueEntity = require('./SubredditIssueEntity');

const createItemFactory = require('./functions/createItem');
const readItemFactory = require('./functions/readItem');

function SubredditIssueFactory(dynamoDBService) {
  const tableName = process.env.SUBREDDIT_ISSUE_TABLE_NAME;

  if (!dynamoDBService) {
    throw Error('"dynamoDBService" must be provided in services/users.');
  }

  if (!tableName) {
    throw Error('"USER_TABLE_NAME" env variable must be specified.');
  }

  const crateItem = createItemFactory(dynamoDBService, SubredditIssueEntity, tableName);
  const readItem = readItemFactory(dynamoDBService, SubredditIssueEntity, tableName);

  return {
    create: crateItem,
    read: readItem,
  };
}

module.exports = SubredditIssueFactory;
