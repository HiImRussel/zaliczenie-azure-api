"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Joi */
const joi_1 = __importDefault(require("joi"));
const updateUserSchema = joi_1.default.object({
    isAdmin: joi_1.default.boolean(),
});
exports.default = updateUserSchema;
