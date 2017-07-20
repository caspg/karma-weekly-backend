function throwAuthorizationError() {
  const error = Error('User was not found');
  error.status = 401;

  throw error;
}

function validateUser(userEntity) {
  if (!userEntity) {
    throwAuthorizationError();
  }

  return userEntity;
}

module.exports = validateUser;
