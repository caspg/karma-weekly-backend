const main = require('./components/main');
const header = require('./components/header');
const footer = require('./components/footer');
const subredditLinkRow = require('./components/subredditLinkRow');

function makeUnsubscribeUrl() {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    throw Error('BASE_URL env variable must be specified!');
  }

  return `${baseUrl}/dashboard`;
}

function template(subredditIssue) {
  const { name, date, links } = subredditIssue;
  const unsubscribeUrl = makeUnsubscribeUrl();

  const linksContent = links
    .map(link => subredditLinkRow(link))
    .join('\n');

  const components = {
    header: header(name, date),
    links: linksContent,
    footer: footer(unsubscribeUrl),
  };

  return main(components);
}

module.exports = template;
