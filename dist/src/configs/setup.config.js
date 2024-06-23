"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParser = exports.apiPort = void 0;
/** Dotenv */
const dotenv_1 = __importDefault(require("dotenv"));
/** Body parser */
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const jsonParser = body_parser_1.default.json();
exports.jsonParser = jsonParser;
const apiPort = process.env.API_PORT || 3000;
exports.apiPort = apiPort;
