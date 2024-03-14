"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.loginUser = exports.deleteUser = exports.getUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const auth_1 = require("../../util/auth");
const bcrypt = __importStar(require("bcrypt"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExists = yield user_model_1.default.findOne({
            where: {
                email: req.body.email
            }
        });
        if (emailExists) {
            return res.status(400).json({ error: "Email already exists", status: 400 });
        }
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        const usernameExists = yield user_model_1.default.findOne({
            where: {
                username: req.body.username
            }
        });
        if (usernameExists) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const userCreated = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstName || "",
            lastname: req.body.lastName || "",
            mobile: req.body.mobile || "",
            role: "User",
        };
        const user = yield user_model_1.default.create(userCreated);
        // return res.status(201).json(user);
        return res.status(200).json({ user, status: 200 });
    }
    catch (error) {
        console.error("Error appending data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(401).json({ error: 'Email Not Found' });
        }
        const passwordMatch = yield bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password Not Matched' });
        }
        var { accessToken } = yield (0, auth_1.generateTokens)(user.dataValues.id, user.dataValues.role);
        return res.status(200).json({ user, accessToken, status: 200 });
    }
    catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.findAll();
        res.status(200).json(users);
        console.log(users, "sgdfd");
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_model_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        yield user.destroy();
        return res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteUser = deleteUser;
