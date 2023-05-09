const ERROR_UNAUTHORIZED_CODE = 401;

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.type = { ERROR_UNAUTHORIZED_CODE };
  }
}

module.exports = Unauthorized;
