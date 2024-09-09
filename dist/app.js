"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = require("./app/middleware/notFound");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// test route
const test = (req, res) => {
    res.send("Hello World, welcome to fitness zone server!");
};
app.get("/", test);
// application route
app.use("/api/v1", routes_1.routes);
// global error handler
app.use(globalErrorHandler_1.default);
// not found route
app.use(notFound_1.notFound);
exports.default = app;
