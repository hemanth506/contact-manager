const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(statusCode);
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      console.log("status code = ", 400);
      res.send({
        title: "Validation error",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.send({
        title: "Not found",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.send({
        title: "Forbidden",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.send({
        title: "Server error",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.send({
        title: "Un authorized",
        message: err.message,
        stacktrace: err.stack,
      });
      break;
    default:
      console.log("No error, All good!");
      next();
      break;
  }
};

module.exports = { errorHandler };
