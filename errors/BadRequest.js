const ERROR_BAD_REQUEST_CODE = 400;

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.type = { ERROR_BAD_REQUEST_CODE };
  }
}
module.exports = BadRequest;
