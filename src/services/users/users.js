const findOrCreateUserFactory = require('./findOrCreateUser');

function usersFactory(User) {
  if (!User) {
    throw Error('"User" must be provided to services/users.');
  }

  return {
    findOrCreateUser: findOrCreateUserFactory(User),
  };
}

module.exports = usersFactory;
