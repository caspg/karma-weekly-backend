function updateUserFactory(User) {
  return function updateUser(key, attributes) {
    if (!key || !attributes) {
      throw Error('Missing paramter! (key, attributes) must be provided.');
    }

    return User.update(key, attributes);
  };
}

module.exports = updateUserFactory;
