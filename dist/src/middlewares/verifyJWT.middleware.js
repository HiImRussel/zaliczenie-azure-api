"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** JWT */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/** Dotenv */
const dotenv_1 = __importDefault(require("dotenv"));
/** Constants */
const auth_constants_1 = require("../constants/auth.constants");
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
if (!secret)
    throw new Error("JWT token is not defined!");
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token || !secret)
        return res.status(403).json(auth_constants_1.NOT_AUTHORIZED_RESPONSE);
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err)
            return res.status(403).json(auth_constants_1.NOT_AUTHORIZED_RESPONSE);
        req.userId = decoded === null || decoded === void 0 ? void 0 : decoded.userId;
        next();
    });
};
exports.default = verifyJWT;
