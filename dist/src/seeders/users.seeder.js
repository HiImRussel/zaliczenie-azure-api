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
/** Models */
const user_model_1 = __importDefault(require("../models/user.model"));
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.destroy({
        where: {},
        truncate: true,
    });
    //password: test123
    yield user_model_1.default.create({
        email: "test@test.com",
        password: "$2b$10$MyK6pq/9lY4Hp4Okfic09eYvPHFcVJ0o2VgqNPrbno.Enwb1wLUfO",
        isAdmin: true,
    });
    yield user_model_1.default.create({
        email: "test2@test.com",
        password: "$2b$10$MyK6pq/9lY4Hp4Okfic09eYvPHFcVJ0o2VgqNPrbno.Enwb1wLUfO",
        isAdmin: false,
    });
    console.log("Users seeded ended!");
});
exports.default = seedUsers;
