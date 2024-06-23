"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Config */
const db_config_1 = __importDefault(require("../configs/db.config"));
/** Models */
require("../models/user.model");
require("../models/task.model");
db_config_1.default
    .sync()
    .then(() => {
    console.log("Tables created successfully!");
})
    .catch((error) => {
    console.error("Unable to create table : ", error);
});
