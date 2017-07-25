class SubredditIssueEntity {
  constructor(data = {}) {
    this.props = {
      name: data.name,
      number: data.number,
      links: data.links,
    };
  }
}

module.exports = SubredditIssueEntity;
