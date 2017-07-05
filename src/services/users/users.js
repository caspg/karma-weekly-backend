const findOrCreateUserFactory = require('./functions/findOrCreateUser');
const findUserFactory = require('./functions/findUser');
const updateUserFactory = require('./functions/updateUser');
const addSubredditFactory = require('./functions/addSubreddit');
const removeSubredditFactory = require('./functions/removeSubreddit');
const removeUserFactory = require('./functions/removeUser');

function usersFactory(User) {
  if (!User) {
    throw Error('"dynamoDBService" must be provided to services/users.');
  }

  return {
    findUser: findUserFactory(User),
    findOrCreateUser: findOrCreateUserFactory(User),
    updateUser: updateUserFactory(User),
    addSubreddit: addSubredditFactory(User),
    removeSubreddit: removeSubredditFactory(User),
    removeUser: removeUserFactory(User),
  };
}

module.exports = usersFactory;
