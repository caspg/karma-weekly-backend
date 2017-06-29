const Joi = require('joi');

const userSchema = {
  email: Joi.string().email(),
};

class User {
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

module.exports = User;
