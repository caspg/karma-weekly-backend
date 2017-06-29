const UserFactory = require('./User');
const findOrCreateUserFactory = require('./functions/findOrCreateUser');

function usersFactory(dynamoDBService) {
  if (!dynamoDBService) {
    throw Error('"dynamoDBService" must be provided to services/users.');
  }

  const User = UserFactory(dynamoDBService);

  return {
    findOrCreateUser: findOrCreateUserFactory(User),
  };
}

module.exports = usersFactory;
