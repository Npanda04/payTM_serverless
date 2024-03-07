"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferMoneyInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.transferMoneyInput = zod_1.default.object({
    to: zod_1.default.string(),
    amount: zod_1.default.number().refine(value => value > 0)
});
