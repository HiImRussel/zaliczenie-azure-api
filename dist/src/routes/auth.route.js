"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Express */
const express_1 = require("express");
/** Middleware */
const verifyJWT_middleware_1 = __importDefault(require("../middlewares/verifyJWT.middleware"));
const verifyAdminRole_middleware_1 = __importDefault(require("../middlewares/verifyAdminRole.middleware"));
/** Controllers */
const auth_controller_1 = require("../controllers/auth.controller");
/** Routes */
const router = (0, express_1.Router)();
/** Get */
router.get("/refreshToken", verifyJWT_middleware_1.default, auth_controller_1.refreshToken);
/** Post */
router.post("/login", auth_controller_1.login);
router.post("/register", (req, res) => (0, auth_controller_1.register)(req, res));
router.post("/registerByAdmin", verifyJWT_middleware_1.default, verifyAdminRole_middleware_1.default, auth_controller_1.registerByAdmin);
/** Patch */
router.patch("/changePassword", verifyJWT_middleware_1.default, auth_controller_1.changePassword);
exports.default = router;
