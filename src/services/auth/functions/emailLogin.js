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

    usersService
      .updateUser({ email }, { emailToken: 6, updateDate: new Date().toString(), firstName: 'Kacper' })
      .then(user => console.log(user));

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

  return emailLogin;
}

module.exports = emailLoginFactory;
