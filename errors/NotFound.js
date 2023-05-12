const { ERROR_NOT_FOUND_CODE } = require('../utils/utils');

class NotFounderr extends Error {
  constructor(message) {
    super(message);
    this.type = ERROR_NOT_FOUND_CODE;
  }
}

module.exports = NotFounderr;
