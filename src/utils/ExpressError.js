class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;

    redirect('/error', { statusCode, message })
  }
}

export default ExpressError;
