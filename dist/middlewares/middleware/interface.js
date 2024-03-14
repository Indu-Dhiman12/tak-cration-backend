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
const http_response_1 = __importDefault(require("../util/http-response"));
const setInterfaces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendSuccess = http_response_1.default.sendSuccess;
    res.sendPaginationSuccess = http_response_1.default.sendPaginationSuccess;
    res.sendError = http_response_1.default.sendError;
    next();
});
exports.default = setInterfaces;
