const usersServiceFactory = require('../users');

describe('users.findOrCreateUser', () => {
  const email = 'email@email.com';
  const user = { email };

  it('returns existing user if user already exists', () => {
    const User = {
      read: jest.fn(() => Promise.resolve(user)),
      create: jest.fn(),
    };
    const users = usersServiceFactory(User);

    return users
      .findOrCreateUser(email)
      .then((result) => {
        expect(result).toEqual(user);
        expect(User.read).toHaveBeenCalledWith({ email });
        expect(User.create).not.toHaveBeenCalled();
      });
  });

  it('creates new user if user does not exit', () => {
    const User = {
      read: jest.fn(() => Promise.resolve()),
      create: jest.fn(() => Promise.resolve(user)),
    };
    const users = usersServiceFactory(User);

    return users
      .findOrCreateUser(email)
      .then((result) => {
        expect(result).toEqual(user);
        expect(User.read).toHaveBeenCalledWith({ email });
        expect(User.create).toHaveBeenCalledWith({ email });
      });
  });
});
