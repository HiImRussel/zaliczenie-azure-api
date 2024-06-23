"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsMiddleware = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    next();
};
exports.default = corsMiddleware;
