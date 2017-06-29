const TABLE_NAME = 'Users';

function UserFactory(dynamoDBService) {
  if (!dynamoDBService) {
    throw Error('"dynamoDBService" must be provided in services/users.');
  }

  function create(params) {
    const dynamoParams = { TableName: TABLE_NAME, Item: params };
    return dynamoDBService.create(dynamoParams);
  }

  function read(params) {
    const dynamoParams = { TableName: TABLE_NAME, Key: params };
    return dynamoDBService.get(dynamoParams);
  }

  return { create, read };
}

module.exports = UserFactory;
