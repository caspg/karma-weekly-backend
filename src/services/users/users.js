const findOrCreateUserFactory = require('./functions/findOrCreateUser');
const findUserFactory = require('./functions/findUser');
const updateUserFactory = require('./functions/updateUser');

function usersFactory(User) {
  if (!User) {
    throw Error('"dynamoDBService" must be provided to services/users.');
  }

  return {
    findUser: findUserFactory(User),
    findOrCreateUser: findOrCreateUserFactory(User),
    updateUser: updateUserFactory(User),
  };
}

module.exports = usersFactory;
