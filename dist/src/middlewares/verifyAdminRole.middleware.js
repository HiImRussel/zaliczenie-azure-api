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
/** Constants */
const auth_constants_1 = require("../constants/auth.constants");
/** Models */
const user_model_1 = __importDefault(require("../models/user.model"));
const verifyAdminRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const user = yield user_model_1.default.findOne({ where: { id: userId, removed: false } });
    if (!user || !user.isAdmin)
        return res.status(403).json(auth_constants_1.NOT_AUTHORIZED_RESPONSE);
    next();
});
exports.default = verifyAdminRole;
