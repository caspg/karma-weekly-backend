function runQuery(query) {
  return Promise.resolve(query);
}

const graphql = { runQuery };

module.exports = graphql;
