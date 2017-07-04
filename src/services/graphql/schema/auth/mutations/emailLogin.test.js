const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const emailLoginFactory = require('./emailLogin');

describe('emailLogin mutation', () => {
  const emailLoginServiceMock = jest.fn();
  const authService = { emailLogin: emailLoginServiceMock };

  const emailLogin = emailLoginFactory(authService);

  it('has correct type', () => {
    const emailLoginTypeFields = emailLogin.type.getFields();
    const fieldsNames = Object.keys(emailLoginTypeFields);

    expect(fieldsNames).toEqual(['error', 'status']);
    expect(emailLoginTypeFields.error.type).toEqual(GraphQLString);
    expect(emailLoginTypeFields.status.type).toEqual(new GraphQLNonNull(GraphQLInt));
  });

  it('accepets correct arguments', () => {
    const emailLoginArgsFields = emailLogin.args;
    const fieldsNames = Object.keys(emailLoginArgsFields);

    expect(fieldsNames).toEqual(['email']);
    expect(emailLoginArgsFields.email.type).toEqual(GraphQLString);
  });

  it('calls authService.emailLogin in resolver', () => {
    const email = 'some@email.pl';
    emailLogin.resolve(null, { email });

    expect(emailLoginServiceMock).toHaveBeenCalledWith(email);
  });
});
