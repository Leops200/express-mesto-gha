const { ERROR_NOT_FOUND_CODE } = require('../utils/utils');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.type = ERROR_NOT_FOUND_CODE;
  }
}

module.exports = NotFound;
