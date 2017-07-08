const createShortLiveJwt = require('./createShortLiveJwt');

function successResponse() {
  return { status: 200, error: null };
}

function errorResponse(error) {
  return { status: 500, error: error.message || 'internal server error' };
}

function emailLoginFactory(usersService, mailerService) {
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

    const shortLiveToken = createShortLiveJwt(email);
    const loginUrl = `${baseUrl}/login/magic/${shortLiveToken}`;

    return usersService
      .findOrCreateUser(email)
      .then(() => mailerService.sendLoginEmail(email, loginUrl))
      .then(successResponse)
      .catch(errorResponse);
  }

  return emailLogin;
}

module.exports = emailLoginFactory;
