"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    const match = err.message.match(/dup key: { id: "(.*?)" }/);
    const getMessage = match && match[1];
    const errorSources = [
        {
            path: "",
            message: `${getMessage} is already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Invalid ID",
        errorSources,
    };
};
exports.handleDuplicateError = handleDuplicateError;
