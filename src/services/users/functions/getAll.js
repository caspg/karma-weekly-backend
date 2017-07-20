function getAllFactory(User) {
  function getAll() {
    return User.getAll();
  }

  return getAll;
}

module.exports = getAllFactory;
