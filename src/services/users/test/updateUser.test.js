const usersServiceFactory = require('../users');

describe('users.updateUser', () => {
  const email = 'email@email.com';
  const firstName = 'Floki';

  const user = { email, firstName };

  it('calls User.update function and return user object', () => {
    const User = {
      update: jest.fn(() => Promise.resolve(user)),
    };
    const users = usersServiceFactory(User);

    return users
      .updateUser({ email }, { firstName })
      .then((result) => {
        expect(result).toEqual(user);
        expect(User.update).toHaveBeenCalledTimes(1);
      });
  });
});
