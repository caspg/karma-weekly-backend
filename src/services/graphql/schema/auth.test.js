const {
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const authFactory = require('./auth');

describe('auth', () => {
  const emailLoginServiceMock = jest.fn();
  const authService = { emailLogin: emailLoginServiceMock };

  const auth = authFactory(authService);

  describe('emailLogin mutation', () => {
    const { emailLogin } = auth.mutations;

    it('has correct type', () => {
      const emailLoginTypeFields = emailLogin.type.getFields();
      const fieldsNames = Object.keys(emailLoginTypeFields);

      expect(fieldsNames).toEqual(['error', 'status']);
      expect(emailLoginTypeFields.error.type).toEqual(GraphQLString);
      expect(emailLoginTypeFields.status.type).toEqual(GraphQLInt);
    });

    it('accepets correct arguments', () => {
      const emailLoginArgsFields = emailLogin.args;
      const fieldsNames = Object.keys(emailLoginArgsFields);

      expect(fieldsNames).toEqual(['email']);
      expect(emailLoginArgsFields.email.type).toEqual(GraphQLString);
    });

    it('calls authService in resolver', () => {
      const email = 'some@email.pl';
      emailLogin.resolve(null, { email });

      expect(emailLoginServiceMock).toHaveBeenCalledWith(email);
    });
  });
});
