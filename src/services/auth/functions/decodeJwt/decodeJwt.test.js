const jsonwebtoken = require('jsonwebtoken');

const decodeJwt = require('./decodeJwt');

describe('decodeJwt function', () => {
  const jwtSecret = 'secret';
  const email = 'some@email.com';
  const expiration = Math.floor(Date.now() / 1000) + (60 * 10);
  const token = jsonwebtoken.sign({ email, exp: expiration }, jwtSecret);

  it('throws an error when JWT_SECRET variable is not provided', () => {
    process.env.JWT_SECRET = '';

    expect(
      () => decodeJwt(token)
    ).toThrow('JWT_SECRET environment variable must be provided!');
  });

  it('decodes json web token', () => {
    process.env.JWT_SECRET = jwtSecret;
    const decoded = decodeJwt(token);

    expect(decoded.email).toBe(email);
    expect(decoded.exp).toBe(expiration);
  });
});
