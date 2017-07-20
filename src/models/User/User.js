const UserEntity = require('./UserEntity');

const createItemFactory = require('./functions/createItem');
const readItemFactory = require('./functions/readItem');
const updateItemFactory = require('./functions/updateItem');
const removeItemFactory = require('./functions/removeItem');
const getAllItemsFactory = require('./functions/getAllItems');

function UserFactory(dynamoDBService) {
  const tableName = process.env.USER_TABLE_NAME;

  if (!dynamoDBService) {
    throw Error('"dynamoDBService" must be provided in services/users.');
  }

  if (!tableName) {
    throw Error('"USER_TABLE_NAME" env variable must be specified.');
  }

  const crateItem = createItemFactory(dynamoDBService, UserEntity, tableName);
  const readItem = readItemFactory(dynamoDBService, UserEntity, tableName);
  const updateItem = updateItemFactory(dynamoDBService, UserEntity, tableName);
  const removeItem = removeItemFactory(dynamoDBService, UserEntity, tableName);
  const getAllItems = getAllItemsFactory(dynamoDBService, UserEntity, tableName);

  return {
    create: crateItem,
    remove: removeItem,
    read: readItem,
    update: updateItem,
    getAll: getAllItems,
  };
}

module.exports = UserFactory;
