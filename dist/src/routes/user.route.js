"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Express */
const express_1 = require("express");
/** Middlewares */
const verifyAdminRole_middleware_1 = __importDefault(require("../middlewares/verifyAdminRole.middleware"));
const verifyJWT_middleware_1 = __importDefault(require("../middlewares/verifyJWT.middleware"));
/** Controllers */
const user_controller_1 = require("../controllers/user.controller");
/** Routes */
const router = (0, express_1.Router)();
/** Get */
router.get("/:id", verifyJWT_middleware_1.default, verifyAdminRole_middleware_1.default, user_controller_1.getUser);
/** Delete */
router.delete("/delete/:id", verifyJWT_middleware_1.default, verifyAdminRole_middleware_1.default, user_controller_1.deleteUser);
/** Patch */
router.patch("/update/:id", verifyJWT_middleware_1.default, user_controller_1.updateUser);
exports.default = router;
