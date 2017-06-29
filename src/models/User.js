const UserEntity = require('./UserEntity');

const TABLE_NAME = 'Users';

function UserFactory(dynamoDBService) {
  if (!dynamoDBService) {
    throw Error('"dynamoDBService" must be provided in services/users.');
  }

  function create(params) {
    const dynamoParams = { TableName: TABLE_NAME, Item: params };

    return dynamoDBService.put(dynamoParams).promise()
      .then(() => new UserEntity(params));
  }

  function read(params) {
    const dynamoParams = { TableName: TABLE_NAME, Key: params };

    return dynamoDBService.get(dynamoParams).promise()
      .then((data) => {
        const item = data.Item;
        if (!item) return null;

        return new UserEntity(item);
      });
  }

  return { create, read };
}

module.exports = UserFactory;
