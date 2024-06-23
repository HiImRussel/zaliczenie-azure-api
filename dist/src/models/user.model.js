"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Sequelize */
const sequelize_1 = require("sequelize");
/** Config */
const db_config_1 = __importDefault(require("../configs/db.config"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    removed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    },
}, {
    sequelize: db_config_1.default,
    tableName: "users",
    timestamps: false,
});
exports.default = User;
