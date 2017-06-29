function updateUserFactory(User) {
  /**
   * @param {object} key
   * @param {object} attributes
   */
  return function updateUser(key, attributes) {
    if (!key || !attributes) {
      throw Error('Missing paramter! (key, attributes) must be provided.');
    }

    if (Object.prototype.toString.call(key) !== '[object Object]') {
      throw Error('"key" parameter must be an Object');
    }

    if (Object.prototype.toString.call(attributes) !== '[object Object]') {
      throw Error('"attributes" parameter must be an Object');
    }

    return User.update(key, attributes);
  };
}

module.exports = updateUserFactory;
