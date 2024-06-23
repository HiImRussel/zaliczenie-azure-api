"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Constants */
const status_constants_1 = require("../constants/status.constants");
const defaultSuccess = (res, statusCode) => res.status(statusCode).json({ status: status_constants_1.STATUS.OK });
exports.default = defaultSuccess;
