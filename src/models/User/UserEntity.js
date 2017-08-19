class UserEntity {
  constructor(data = {}) {
    this.props = {
      email: data.email,
      subreddits: data.subreddits || [],
    };
  }
}

module.exports = UserEntity;
