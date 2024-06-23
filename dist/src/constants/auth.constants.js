"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_AUTHORIZED_RESPONSE = exports.TOKEN_EXPIRE_TIME_SECONDS = void 0;
/** Constants */
const status_constants_1 = require("./status.constants");
exports.TOKEN_EXPIRE_TIME_SECONDS = 3600;
exports.NOT_AUTHORIZED_RESPONSE = {
    status: status_constants_1.STATUS.ERROR,
    message: "Unauthorized!",
};
