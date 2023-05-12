const { ERROR_UNAUTHORIZED_CODE } = require('../utils/utils');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.type = ERROR_UNAUTHORIZED_CODE;
  }
}

module.exports = Unauthorized;
