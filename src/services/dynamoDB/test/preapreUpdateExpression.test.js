const dynamoDBServiceFactory = require('../dynamoDB');

describe('dynamoDBService.preapreUpdateExpression', () => {
  const dynamoDBService = dynamoDBServiceFactory();
  const attributes = {
    firstName: 'Ragnar',
    profession: 'Viking',
  };

  const {
    updateExpression,
    expressionAttributeValues,
  } = dynamoDBService.preapreUpdateExpression(attributes);

  it('creates correct updateExpression', () => {
    const expected = 'SET firstName = :firstName, profession = :profession';
    expect(updateExpression).toBe(expected);
  });

  it('creates correct expressionAttributeValues', () => {
    const expected = {
      ':firstName': 'Ragnar',
      ':profession': 'Viking',
    };

    expect(expressionAttributeValues).toEqual(expected);
  });
});
