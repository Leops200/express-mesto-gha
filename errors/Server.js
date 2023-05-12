const { ERROR_SERVER_CODE } = require('../utils/utils');

class Server extends Error {
  constructor(message) {
    super(message);
    this.type = ERROR_SERVER_CODE;
  }
}

module.exports = Server;
