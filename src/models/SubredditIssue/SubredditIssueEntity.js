class SubredditIssueEntity {
  constructor(data = {}) {
    this.props = {
      name: data.name,
      date: data.date,
      links: data.links,
    };
  }
}

module.exports = SubredditIssueEntity;
