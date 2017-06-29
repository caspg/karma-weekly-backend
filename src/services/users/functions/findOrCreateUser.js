const findUserFactory = require('./findUser');
const createUserFactory = require('./createUser');

function findOrCreateUserFactory(User) {
  function findOrCreateUser(email) {
    const findUser = findUserFactory(User);
    const createUser = createUserFactory(User);

    return findUser(email).then((user) => {
      if (!user) {
        return createUser(email);
      }

      return user;
    });
  }

  return findOrCreateUser;
}

module.exports = findOrCreateUserFactory;
