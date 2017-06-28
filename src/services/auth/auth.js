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

  return {
    error: null,
    status: 200,
  };
}

const authService = {
  emailLogin,
};

module.exports = authService;
