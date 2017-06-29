const findOrCreateUserFactory = require('./functions/findOrCreateUser');
const updateUserFactory = require('./functions/updateUser');

function usersFactory(User) {
  if (!User) {
    throw Error('"dynamoDBService" must be provided to services/users.');
  }

  return {
    findOrCreateUser: findOrCreateUserFactory(User),
    update: updateUserFactory(User),
  };
}

module.exports = usersFactory;
