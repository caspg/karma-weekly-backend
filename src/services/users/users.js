const findOrCreateUserFactory = require('./functions/findOrCreateUser');

function usersFactory(User) {
  if (!User) {
    throw Error('"dynamoDBService" must be provided to services/users.');
  }

  return {
    findOrCreateUser: findOrCreateUserFactory(User),
  };
}

module.exports = usersFactory;
