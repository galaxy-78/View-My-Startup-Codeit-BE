import HttpStatus from "./HttpStatus";

class TypeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TypeError';
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = HttpStatus.BAD_REQUEST;
  }
}

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.statusCode = HttpStatus.NOT_FOUND;
  }
}

export { TypeError, ValidationError, CastError };
