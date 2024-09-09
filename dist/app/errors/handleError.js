"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = () => {
    const statusCode = 400;
    const message = "";
    const errorSources = [
        {
            path: "throw Error || throw AppError",
            message: "Error occurred!",
        },
    ];
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.handleError = handleError;
