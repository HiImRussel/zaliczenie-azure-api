"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Config */
const app_config_1 = __importDefault(require("../configs/app.config"));
/** Routes */
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const tasks_route_1 = __importDefault(require("./tasks.route"));
app_config_1.default.use("/auth", auth_route_1.default);
app_config_1.default.use("/user", user_route_1.default);
app_config_1.default.use("/tasks", tasks_route_1.default);
