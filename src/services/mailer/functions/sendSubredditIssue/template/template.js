const main = require('./components/main');
const header = require('./components/header');
const footer = require('./components/footer');
const subredditLinkRow = require('./components/subredditLinkRow');

function template(subredditIssue) {
  const { name, date, links } = subredditIssue;
  const unsubscribeUrl = 'https//google.com'; // TODO

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
