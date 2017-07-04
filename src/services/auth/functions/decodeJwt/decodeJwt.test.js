const jsonwebtoken = require('jsonwebtoken');

const decodeJwt = require('./decodeJwt');

describe('decodeJwt function', () => {
  const jwtSecret = 'secret';

  beforeEach(() => { process.env.JWT_SECRET = jwtSecret; });

  it('throws an error when JWT_SECRET variable is not provided', () => {
    process.env.JWT_SECRET = '';

    expect(
      () => decodeJwt('token')
    ).toThrow('JWT_SECRET environment variable must be provided!');
  });

  it('returns rejected promise when token is invalid', () => {
    const invalidToken = 'some-token';

    return decodeJwt(invalidToken)
      .then(() => { throw Error(); })
      .catch((err) => {
        expect(err.name).toBe('JsonWebTokenError');
        expect(err.message).toBe('jwt malformed');
      });
  });

  it('returns rejected promise when token is expired', () => {
    const email = 'some@email.com';
    // 10 minutes ago
    const expiration = Math.floor(Date.now() / 1000) - (60 * 10);
    const token = jsonwebtoken.sign({ email, exp: expiration }, jwtSecret);

    return decodeJwt(token)
      .then(() => { throw Error(); })
      .catch((err) => {
        expect(err.name).toBe('TokenExpiredError');
        expect(err.message).toBe('jwt expired');
      });
  });

  it('decodes json web token', () => {
    const email = 'some@email.com';
    // 10 minutes from now
    const expiration = Math.floor(Date.now() / 1000) + (60 * 10);
    const token = jsonwebtoken.sign({ email, exp: expiration }, jwtSecret);

    return decodeJwt(token)
      .then((decoded) => {
        expect(decoded.email).toBe(email);
        expect(decoded.exp).toBe(expiration);
      });
  });
});
