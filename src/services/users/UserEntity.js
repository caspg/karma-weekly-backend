const Joi = require('joi');

const userSchema = {
  email: Joi.string().email(),
};

class UserEntity {
  constructor(data = {}) {
    this.schema = userSchema;

    this.props = {
      email: data.email,
    };
  }

  validate() {
    return Joi.validate(this.properties, this.schema);
  }
}

module.exports = UserEntity;
