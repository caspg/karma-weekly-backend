const jsonwebtoken = require('jsonwebtoken');

const createJwt = require('./createJwt');

describe('createJwt function', () => {
  const email = 'some@email.com';
  const expiration = Math.floor(Date.now() / 1000) + (60 * 10);
  const payload = { email };

  it('throws an error when JWT_SECRET variable is not provided', () => {
    process.env.JWT_SECRET = '';

    expect(
      () => createJwt(payload, expiration)
    ).toThrow('JWT_SECRET environment variable must be provided!');
  });

  it('creates valid json web token', () => {
    process.env.JWT_SECRET = 'secret';

    const token = createJwt(payload, expiration);
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    expect(decoded.email).toBe(email);
    expect(decoded.exp).toBe(expiration);
  });
});

