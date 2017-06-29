const UserEntity = require('./UserEntity');
const createItemFactory = require('./functions/createItem');
const readItemFactory = require('./functions/readItem');

const TABLE_NAME = 'Users';

function UserFactory(dynamoDBService) {
  if (!dynamoDBService) {
    throw Error('"dynamoDBService" must be provided in services/users.');
  }

  const crateItem = createItemFactory(dynamoDBService, UserEntity, TABLE_NAME);
  const readItem = readItemFactory(dynamoDBService, UserEntity, TABLE_NAME);

  return {
    create: crateItem,
    read: readItem,
  };
}

module.exports = UserFactory;
