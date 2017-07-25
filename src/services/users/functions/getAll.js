function getAllFactory(User) {
  /**
   * @returns {promise.[UserEntity]array} Promise which resolves to an array of UserEntities
   */
  function getAll() {
    return User.getAll();
  }

  return getAll;
}

module.exports = getAllFactory;
