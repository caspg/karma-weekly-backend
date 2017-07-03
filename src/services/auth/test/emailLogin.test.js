const authServiceFactory = require('../auth');

/* eslint-disable arrow-body-style */
describe('auth.emailLogin', () => {
  const email = 'hans@solo.com';

  beforeEach(() => { process.env.BASE_URL = 'http://base.com'; });

  describe('when email is not provided', () => {
    const authService = authServiceFactory({});

    it('throws an error', () => {
      expect(() => authService.emailLogin()).toThrow('Email must be provided!');
    });
  });

  describe('BASE_URL env variable', () => {
    const authService = authServiceFactory({});

    it('throws an error', () => {
      process.env.BASE_URL = '';
      const errorMsg = 'BASE_URL env variable must be specified!';
      expect(() => authService.emailLogin(email)).toThrow(errorMsg);
    });
  });

  describe('when email and BASE_URL are provided', () => {
    const userService = {
      findOrCreateUser: jest.fn(() => Promise.resolve()),
      updateUser: jest.fn(() => Promise.resolve()),
    };
    const authService = authServiceFactory(userService);

    beforeEach(() => {
      userService.findOrCreateUser.mockClear();
      userService.updateUser.mockClear();
    });

    it('finds or create user', () => {
      return authService
        .emailLogin(email)
        .then(() => {
          expect(userService.findOrCreateUser).toHaveBeenCalledWith(email);
        });
    });

    it('updates user with shortToken', () => {
      return authService
        .emailLogin(email)
        .then(() => {
          const mockParameters = userService.updateUser.mock.calls[0];

          expect(userService.updateUser).toHaveBeenCalled();
          expect(mockParameters[0]).toEqual({ email });
          expect(typeof mockParameters[1].shortToken).toBe('string');
        });
    });

    it('returns correct response', () => {
      return authService
        .emailLogin(email)
        .then((result) => {
          expect(result).toEqual({ error: null, status: 200 });
        });
    });
  });

  describe('when there was an error', () => {
    const errorMessage = 'there was some error';
    const userService = {
      findOrCreateUser: jest.fn(() => Promise.resolve()),
      updateUser: jest.fn(() => { throw Error(errorMessage); }),
    };

    const authService = authServiceFactory(userService);

    it('returns error response', () => {
      return authService
        .emailLogin(email)
        .then((result) => {
          expect(result).toEqual({ error: errorMessage, status: 500 });
        });
    });
  });
});
