const findUserFactory = require('./findUser');

/**
 * Creates findOrCreateUser service function.
 * @param {object} User
 * @returns {function}
 */
function findOrCreateUserFactory(User) {
  /**
   * Find existing user or create new one.
   * @param {string} email
   * @returns {promise} user entity
   */
  function findOrCreateUser(email) {
    return findUserFactory(User)(email);
  }

  return findOrCreateUser;
}

module.exports = findOrCreateUserFactory;
