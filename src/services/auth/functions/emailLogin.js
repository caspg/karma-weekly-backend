const uuid = require('uuid/v4');

function successResponse() {
  return { status: 200, error: null };
}

function errorResponse(error) {
  return { status: 500, error: error.message || 'internal server error' };
}

function emailLoginFactory(usersService) {
  /**
   * Send an email with Login link.
   * @param {string} email
   */
  function emailLogin(email) {
    if (!email) {
      throw Error('Email must be provided!');
    }

    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) {
      throw Error('BASE_URL env variable must be specified!');
    }

    const shortToken = uuid();

    return usersService
      .findOrCreateUser(email)
      .then(() => usersService.updateUser({ email }, { shortToken }))
      .then(successResponse)
      .catch(errorResponse);

    // TODO
    // * create email with Link
    // * send email with link
  }

  return emailLogin;
}

module.exports = emailLoginFactory;
