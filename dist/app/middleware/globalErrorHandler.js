"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = require("../errors/handleValidationError");
const handleDuplicateError_1 = require("../errors/handleDuplicateError");
const handleCastError_1 = require("../errors/handleCastError");
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    // Check headers are already sent
    if (res.headersSent) {
        return next(err);
    }
    let statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    let message = (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong!",
        },
    ];
    if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedErrorResponse = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedErrorResponse.statusCode;
        message = simplifiedErrorResponse.message;
        errorSources = simplifiedErrorResponse.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedErrorResponse = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedErrorResponse.statusCode;
        message = simplifiedErrorResponse.message;
        errorSources = simplifiedErrorResponse.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedErrorResponse = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplifiedErrorResponse.statusCode;
        message = simplifiedErrorResponse.message;
        errorSources = simplifiedErrorResponse.errorSources;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error: err,
        stack: config_1.default.NODE_ENV === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
