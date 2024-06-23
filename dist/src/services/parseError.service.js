"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSequelizeError = exports.parseJoiError = exports.parseError = void 0;
/** Constants */
const status_constants_1 = require("../constants/status.constants");
const parseError = (error, res) => res.status(400).json({
    status: status_constants_1.STATUS.ERROR,
    errors: error.map((err) => ({
        field: err.field,
        message: err.message,
    })),
});
exports.parseError = parseError;
const parseJoiError = (error, res) => {
    const errors = error.details.map((err) => {
        var _a;
        return ({
            field: ((_a = err.context) === null || _a === void 0 ? void 0 : _a.key) || "",
            message: err.message,
        });
    });
    (0, exports.parseError)(errors, res);
};
exports.parseJoiError = parseJoiError;
const parseSequelizeError = (error, res) => {
    const errors = error.errors.map((err) => ({
        field: err.path || "",
        message: err.message,
    }));
    (0, exports.parseError)(errors, res);
};
exports.parseSequelizeError = parseSequelizeError;
