"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.registerByAdmin = exports.register = exports.refreshToken = exports.login = void 0;
/** JWT */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/** Dotenv */
const dotenv_1 = __importDefault(require("dotenv"));
/** Bcrypt */
const bcrypt_1 = __importDefault(require("bcrypt"));
/** Services */
const parseError_service_1 = require("../services/parseError.service");
const defaultSuccess_service_1 = __importDefault(require("../services/defaultSuccess.service"));
/** Constants */
const fields_constants_1 = require("../constants/fields.constants");
const auth_constants_1 = require("../constants/auth.constants");
const status_constants_1 = require("../constants/status.constants");
/** Validation */
const newUser_validation_1 = __importDefault(require("../validations/newUser.validation"));
const login_validation_1 = __importDefault(require("../validations/login.validation"));
/** Models */
const user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
const jwtToken = process.env.JWT_SECRET;
const defaultLoginError = [
    {
        field: fields_constants_1.GENERAL_FIELDS,
        message: "Email or password are incorrect",
    },
];
if (!jwtToken)
    throw new Error("JWT token is not defined!");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error } = login_validation_1.default.validate({ email, password });
    if (error)
        return (0, parseError_service_1.parseJoiError)(error, res);
    const user = yield user_model_1.default.findOne({
        attributes: { exclude: ["removed"] },
        where: { email, removed: false },
    });
    if (!user)
        return (0, parseError_service_1.parseError)(defaultLoginError, res);
    const valid = yield bcrypt_1.default.compare(password, user.password);
    if (!valid)
        return (0, parseError_service_1.parseError)(defaultLoginError, res);
    const token = jsonwebtoken_1.default.sign({ name: user.email, userId: user.id }, jwtToken, {
        expiresIn: `${auth_constants_1.TOKEN_EXPIRE_TIME_SECONDS}s`,
    });
    user.password = undefined;
    res.json({ user, token, expireTime: auth_constants_1.TOKEN_EXPIRE_TIME_SECONDS });
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];
    if (!token)
        return res
            .sendStatus(401)
            .json({ status: status_constants_1.STATUS.ERROR, message: "Token is not defined" });
    jsonwebtoken_1.default.verify(token, jwtToken, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res
                .status(401)
                .json({ status: status_constants_1.STATUS.ERROR, message: "Token is not valid" });
        const userId = decoded.userId;
        const newToken = jsonwebtoken_1.default.sign({ name: decoded.email, userId: userId }, jwtToken, {
            expiresIn: `${auth_constants_1.TOKEN_EXPIRE_TIME_SECONDS}s`,
        });
        if (!decoded.userId)
            return res
                .sendStatus(401)
                .json({ status: status_constants_1.STATUS.ERROR, message: "UserID not found" });
        const user = yield user_model_1.default.findOne({
            attributes: { exclude: ["password", "removed"] },
            where: { id: userId, removed: false },
        });
        if (!user)
            return res
                .sendStatus(401)
                .json({ status: status_constants_1.STATUS.ERROR, message: "User not found" });
        return res.status(200).json({
            user,
            token: newToken,
            expireTime: auth_constants_1.TOKEN_EXPIRE_TIME_SECONDS,
        });
    }));
});
exports.refreshToken = refreshToken;
const register = (req, res, registerByAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error } = newUser_validation_1.default.validate({
        email,
        password,
    });
    if (error)
        return (0, parseError_service_1.parseJoiError)(error, res);
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    const newUser = {
        email,
        password: passwordHash,
        isAdmin: registerByAdmin ? req.body.isAdmin || false : false,
    };
    const user = yield user_model_1.default.findOne({ where: { email } });
    if (user)
        return (0, parseError_service_1.parseError)([{ field: "email", message: "Email already exists" }], res);
    yield user_model_1.default.create(newUser);
    (0, defaultSuccess_service_1.default)(res, 201);
});
exports.register = register;
const registerByAdmin = (req, res) => (0, exports.register)(req, res, true);
exports.registerByAdmin = registerByAdmin;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { newPassword } = req.body;
    if (!userId)
        return res.status(400).json({
            status: status_constants_1.STATUS.ERROR,
            message: "Failed to update password",
        });
    if (!newPassword || (newPassword === null || newPassword === void 0 ? void 0 : newPassword.length) < 6)
        return (0, parseError_service_1.parseError)([{ field: "password", message: "Password minimum 6 characters" }], res);
    const passwordHash = yield bcrypt_1.default.hash(newPassword, 10);
    const targetUser = yield user_model_1.default.findOne({ where: { id: userId } });
    if (!targetUser)
        return res
            .status(400)
            .json({ status: status_constants_1.STATUS.ERROR, message: "User not found" });
    user_model_1.default.update({ password: passwordHash }, { where: { id: userId } })
        .then(() => res.status(200).json({
        status: status_constants_1.STATUS.OK,
        message: "Password updated successfully",
    }))
        .catch(() => res.status(400).json({
        status: status_constants_1.STATUS.ERROR,
        message: "Failed to update password",
    }));
});
exports.changePassword = changePassword;
