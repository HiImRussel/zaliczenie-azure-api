"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Body parser */
const body_parser_1 = __importDefault(require("body-parser"));
/** Cors */
const cors_1 = __importDefault(require("cors"));
/** Config */
const app_config_1 = __importDefault(require("./app.config"));
const setup_config_1 = require("./setup.config");
/** Middleware */
const cors_middleware_1 = __importDefault(require("../middlewares/cors.middleware"));
app_config_1.default.use(body_parser_1.default.urlencoded({ extended: false }));
app_config_1.default.use(setup_config_1.jsonParser);
app_config_1.default.use((0, cors_1.default)());
app_config_1.default.use(cors_middleware_1.default);
