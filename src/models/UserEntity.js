class UserEntity {
  constructor(data = {}) {
    this.props = {
      email: data.email,
    };
  }
}

module.exports = UserEntity;
