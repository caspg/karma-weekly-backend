function createUserFactory(User) {
  return function createUser(email) {
    if (!email) {
      throw Error('"email" must be provided to findUser service');
    }

    return User.create({ email });
  };
}

module.exports = createUserFactory;
