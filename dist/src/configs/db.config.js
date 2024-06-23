"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Sequelize */
const sequelize_1 = require("sequelize");
/** Dotenv */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = process.env.DB_NAME;
const dbLogin = process.env.DB_LOGIN;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
if (!dbName || !dbLogin || !dbPassword || !dbHost)
    throw new Error("DB config is incorrect!");
const sequelize = new sequelize_1.Sequelize(dbName, dbLogin, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    logging: false,
});
sequelize
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((error) => {
    console.error("Unable to connect to the database: ", error);
});
exports.default = sequelize;
