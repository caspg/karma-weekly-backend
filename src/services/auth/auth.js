function authServiceFactory(usersService) {
  if (!usersService) {
    throw Error('"usersService" must be provided to services/auth.');
  }

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

    console.log('usersService: ', usersService);

    // TODO
    // * generate token
    // * create or find user
    // * set token to user
    // * create emailLink
    // * send email with link

    return {
      error: null,
      status: 200,
    };
  }

  return {
    emailLogin,
  };
}

module.exports = authServiceFactory;
