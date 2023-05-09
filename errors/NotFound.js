const ERROR_NOT_FOUND_CODE = 404;

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.type = { ERROR_NOT_FOUND_CODE };
  }
}

module.exports = NotFound;
