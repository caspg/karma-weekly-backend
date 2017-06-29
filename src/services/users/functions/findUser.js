function findUserFactory(User) {
  return function findUser(email) {
    if (!email) {
      throw Error('"email" must be provided to findUser service');
    }

    return User.read({ email });
  };
}

module.exports = findUserFactory;
