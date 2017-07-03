const uuid = require('uuid/v4');

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

    return usersService
      .findOrCreateUser(email)
      .then(() => {
        const token = uuid();
        const attributes = {
          shortToken: token,
        };

        return usersService
          .updateUser({ email }, attributes)
          .then(() => ({
            error: null,
            status: 200,
          }));
      });

    // TODO
    // * create emailLink
    // * send email with link

    // TODO: handle errors
  }

  return emailLogin;
}

module.exports = emailLoginFactory;
