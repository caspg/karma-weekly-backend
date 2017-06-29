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

const authService = {
  emailLogin,
};

module.exports = authService;
