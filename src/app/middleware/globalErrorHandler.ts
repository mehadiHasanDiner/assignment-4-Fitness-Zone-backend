import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../interface/errorSource.interface";
import { handleValidationError } from "../errors/handleValidationError";
import { handleDuplicateError } from "../errors/handleDuplicateError";
import { handleCastError } from "../errors/handleCastError";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Check headers are already sent
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err?.statusCode || 500;
  let message = err?.message || "Something went wrong";
  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err?.name === "ValidationError") {
    const simplifiedErrorResponse = handleValidationError(err);
    statusCode = simplifiedErrorResponse.statusCode;
    message = simplifiedErrorResponse.message;
    errorSources = simplifiedErrorResponse.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedErrorResponse = handleCastError(err);
    statusCode = simplifiedErrorResponse.statusCode;
    message = simplifiedErrorResponse.message;
    errorSources = simplifiedErrorResponse.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedErrorResponse = handleDuplicateError(err);
    statusCode = simplifiedErrorResponse.statusCode;
    message = simplifiedErrorResponse.message;
    errorSources = simplifiedErrorResponse.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
