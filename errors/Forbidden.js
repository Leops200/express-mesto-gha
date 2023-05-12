const { ERROR_FORBIDDEN_CODE } = require('../utils/utils');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.type = ERROR_FORBIDDEN_CODE;
  }
}

module.exports = Forbidden;
