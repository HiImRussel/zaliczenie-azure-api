"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Config */
const app_config_1 = __importDefault(require("./src/configs/app.config"));
const setup_config_1 = require("./src/configs/setup.config");
require("./src/configs/middlewares.config");
require("./src/routes");
require("./src/configs/db.config");
/** Constants */
const status_constants_1 = require("./src/constants/status.constants");
app_config_1.default.all("*", (req, res) => {
    res.status(404).json({ status: status_constants_1.STATUS.ERROR, message: "Not Found" });
});
app_config_1.default.listen(setup_config_1.apiPort, () => console.log(`⚡️[server]: Server is running at http://127.0.0.1:${setup_config_1.apiPort}`)).on("error", (err) => {
    process.once("SIGUSR2", () => process.kill(process.pid, "SIGUSR2"));
    process.on("SIGINT", () => process.kill(process.pid, "SIGINT"));
});
