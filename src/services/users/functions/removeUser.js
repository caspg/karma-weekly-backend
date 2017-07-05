function successResponse() {
  return { status: 200, error: null };
}

function errorResponse(error) {
  return { status: 500, error: error.message || 'internal server error' };
}

function removeUserFactory(User) {
  /**
   * @param {string} email
   * @returns {promise.<object>}
   */
  function removeUser(email) {
    if (!email) {
      throw Error('"email" must be provided to findUser service');
    }

    return User
      .remove({ email })
      .then(successResponse)
      .catch(errorResponse);
  }

  return removeUser;
}

module.exports = removeUserFactory;
