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
exports.deleteUser = exports.updateUser = exports.getUser = void 0;
/** Modles */
const user_model_1 = __importDefault(require("../models/user.model"));
/** Validation */
const updateUser_validation_1 = __importDefault(require("../validations/updateUser.validation"));
/** Services */
const parseError_service_1 = require("../services/parseError.service");
/** Constants */
const status_constants_1 = require("../constants/status.constants");
const fields_constants_1 = require("../constants/fields.constants");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const convertedId = id ? +id : 0;
    if (!id || isNaN(convertedId))
        return (0, parseError_service_1.parseError)([{ field: fields_constants_1.GENERAL_FIELDS, message: "User not found!" }], res);
    const user = yield user_model_1.default.findOne({
        attributes: { exclude: ["password", "removed"] },
        where: { id: convertedId, removed: false },
    });
    if (!user)
        return (0, parseError_service_1.parseError)([{ field: fields_constants_1.GENERAL_FIELDS, message: "User not found!" }], res);
    res.status(200).json({
        status: status_constants_1.STATUS.OK,
        user,
    });
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { id } = req.params;
    let { isAdmin } = req.body;
    if (!id || !userId)
        return (0, parseError_service_1.parseError)([{ field: fields_constants_1.GENERAL_FIELDS, message: "User not found!" }], res);
    const userWhichUpdating = yield user_model_1.default.findOne({ where: { id: userId } });
    if (!userWhichUpdating)
        return (0, parseError_service_1.parseError)([{ field: fields_constants_1.GENERAL_FIELDS, message: "User not found!" }], res);
    if (!userWhichUpdating.isAdmin && userId !== +id)
        return res.status(403).json({
            status: status_constants_1.STATUS.ERROR,
            errors: [
                {
                    field: fields_constants_1.GENERAL_FIELDS,
                    message: "You are not allowed to update this user!",
                },
            ],
        });
    if (!userWhichUpdating.isAdmin) {
        isAdmin = undefined;
    }
    const { error } = updateUser_validation_1.default.validate({
        isAdmin,
    });
    if (error)
        return (0, parseError_service_1.parseJoiError)(error, res);
    if (!userWhichUpdating)
        return (0, parseError_service_1.parseError)([{ field: fields_constants_1.GENERAL_FIELDS, message: "User not found!" }], res);
    const dataToUpdate = {
        isAdmin: userWhichUpdating.isAdmin ? isAdmin : false,
    };
    const userToUpdate = yield user_model_1.default.findOne({ where: { id, removed: false } });
    if (!userToUpdate)
        return (0, parseError_service_1.parseError)([{ field: fields_constants_1.GENERAL_FIELDS, message: "User not found!" }], res);
    user_model_1.default.update(dataToUpdate, { where: { id } })
        .then(() => {
        res.status(200).json({
            status: status_constants_1.STATUS.OK,
        });
    })
        .catch(() => {
        (0, parseError_service_1.parseError)([{ field: fields_constants_1.GENERAL_FIELDS, message: "Failed to update user!" }], res);
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userToDelete = yield user_model_1.default.findOne({ where: { id } });
    if (!userToDelete)
        return (0, parseError_service_1.parseError)([{ field: fields_constants_1.GENERAL_FIELDS, message: "User not found!" }], res);
    user_model_1.default.update({ removed: true }, { where: { id } })
        .then(() => res.json({ status: status_constants_1.STATUS.OK }))
        .catch(() => (0, parseError_service_1.parseError)([{ field: fields_constants_1.GENERAL_FIELDS, message: "Failed to destroy user!" }], res));
});
exports.deleteUser = deleteUser;
