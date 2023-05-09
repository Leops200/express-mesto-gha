const ERROR_SERVER_CODE = 500;

class Server extends Error {
  constructor(message) {
    super(message);
    this.type = { ERROR_SERVER_CODE };
  }
}

module.exports = Server;
