const authServiceFactory = require('../auth');

/* eslint-disable arrow-body-style */
describe('auth.emailLogin', () => {
  const email = 'hans@solo.com';

  beforeEach(() => {
    process.env.BASE_URL = 'http://base.com';
    process.env.JWT_SECRET = 'secret';
  });

  describe('when email is not provided', () => {
    const authService = authServiceFactory({}, {});

    it('throws an error', () => {
      expect(() => authService.emailLogin()).toThrow('Email must be provided!');
    });
  });

  describe('BASE_URL env variable', () => {
    const authService = authServiceFactory({}, {});

    it('throws an error', () => {
      process.env.BASE_URL = '';
      const errorMsg = 'BASE_URL env variable must be specified!';
      expect(() => authService.emailLogin(email)).toThrow(errorMsg);
    });
  });

  describe('when there was an error', () => {
    const errorMessage = 'there was some error';
    const userService = {
      findOrCreateUser: jest.fn(() => Promise.resolve()),
    };

    const mailerService = {
      sendEmail: () => { throw Error(errorMessage); },
    };

    const authService = authServiceFactory(userService, mailerService);

    it('returns error response', () => {
      return authService
        .emailLogin(email)
        .then((result) => {
          expect(result).toEqual({ error: errorMessage, status: 500 });
        });
    });
  });

  describe('when email and BASE_URL are provided', () => {
    const userService = {
      findOrCreateUser: jest.fn(() => Promise.resolve()),
    };
    const mailerService = {
      sendEmail: jest.fn(() => Promise.resolve()),
    };

    const authService = authServiceFactory(userService, mailerService);

    beforeEach(() => {
      userService.findOrCreateUser.mockClear();
    });

    it('finds or create user', () => {
      return authService
        .emailLogin(email)
        .then(() => {
          expect(userService.findOrCreateUser).toHaveBeenCalledWith(email);
        });
    });

    it('sends an email to the user', () => {
      return authService
        .emailLogin(email)
        .then(() => {
          const mockParameters = mailerService.sendEmail.mock.calls[0];
          const expectedUrlRegex = new RegExp(`^${process.env.BASE_URL}/login/magic/\\S+$`);

          expect(mailerService.sendEmail).toHaveBeenCalled();
          expect(mockParameters[0]).toBe(email);
          expect(mockParameters[1]).toMatch(expectedUrlRegex);
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
});
