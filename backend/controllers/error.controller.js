import AppError from "../utils/app_error.js";
import { IS_PRODUCTION } from "../utils/env_values.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const key = err.keyValue;
  let errorValues = [];
  for (const k in key) {
    errorValues.push(`${key[k]}`);
  }
  const message = `${errorValues.join(
    ", "
  )} already in use. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `${errors.join(", ")}`;
  return new AppError(message, 400);
};

const handleInvalidToken = (err) => {
  return new AppError("Unauthorized, Please login to continue.", 401);
};

const handleExpiredToken = (err) => {
  return new AppError("Your token has expired!, Please login again.", 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // Operational (trusted error)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // unknown error
    console.error("ERROR ❌", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const GlobalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (!IS_PRODUCTION) {
    let error = err;
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleInvalidToken(error);
    if (error.name === "TokenExpiredError") error = handleExpiredToken(error);
    sendErrorProd(error, res);
  } else {
    sendErrorDev(err, res);
  }
};

export default GlobalErrorHandler;
