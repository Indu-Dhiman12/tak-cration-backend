"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const multer_1 = __importDefault(require("multer"));
const maxSize = 200 * 1024 * 1024;
let storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload");
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime().toString()}-${file.originalname}`);
    },
});
let uploadFile = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util_1.default.promisify(uploadFile);
exports.default = uploadFileMiddleware;
