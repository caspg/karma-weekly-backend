/**
 * Parse attributes object
 * and returns updateExpression and expressionAttributeValues.
 *
 * @param {object} attributes to update
 * @returns {object}
 */
function preapreUpdateExpression(attributes) {
  const keys = Object.keys(attributes);
  const expressionKeys = keys.map(key => `${key} = :${key}`).join(', ');

  const updateExpression = `SET ${expressionKeys}`;

  const expressionAttributeValues = keys.reduce((accumulate, key) => {
    accumulate[`:${key}`] = attributes[key]; // eslint-disable-line no-param-reassign
    return accumulate;
  }, {});

  return { updateExpression, expressionAttributeValues };
}

module.exports = preapreUpdateExpression;
