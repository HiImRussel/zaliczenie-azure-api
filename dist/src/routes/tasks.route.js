"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Express */
const express_1 = require("express");
/** Middleware */
const verifyJWT_middleware_1 = __importDefault(require("../middlewares/verifyJWT.middleware"));
/** Routes */
const router = (0, express_1.Router)();
/** Get */
router.get("/all", verifyJWT_middleware_1.default, (req, res) => {
    res.send("Get all todos");
});
/** Post */
router.post("/add", verifyJWT_middleware_1.default, (req, res) => {
    res.send("Create a todo");
});
/** Patch */
router.patch("/update", verifyJWT_middleware_1.default, (req, res) => {
    res.send("Update a todo");
});
exports.default = router;
