const { ERROR_CONFLICT_CODE } = require('../utils/utils');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.type = ERROR_CONFLICT_CODE;
  }
}

module.exports = Conflict;
