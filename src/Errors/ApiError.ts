class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string | undefined, stack: '') {
    // set for parent class
    super(message);

    // this is for own property
    this.statusCode = statusCode;

    // check if stack has or not
    if (stack) {
      this.stack = stack;
    } else {
      // else set Error class error
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
