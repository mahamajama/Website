

export class MyError extends Error {
  constructor(message, status = null, options = null) {
    super(message, options);
    this.status = status;
    this.name = 'MyError';
  }
}

export default function errorHandler(err, req, res, next) {
    let errObj = {
        message: err.message || 'An error occured!!!',
        status: err.status || 500,
        cause: err.cause,
        stack: getStack(),
    }
    return res.status(errObj.status).json(errObj);
}

function getStack() {
    const obj = {};
    if ("captureStackTrace" in Error) {
        // Avoid getStack itself in the stack trace
        Error.captureStackTrace(obj, getStack);
    }
    return obj.stack;
}