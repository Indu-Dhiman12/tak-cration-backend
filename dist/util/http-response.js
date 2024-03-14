"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_conf_1 = __importDefault(require("../conf/http-error.conf"));
exports.default = {
    sendSuccess: (res, data, statusCode = 200) => {
        res.status(statusCode).json({ success: true, data, error: null });
    },
    sendPaginationSuccess: (res, data, count = 0, statusCode = 200) => {
        res.status(statusCode).json({ success: true, data, count, error: null });
    },
    sendError: (res, error, data = null) => {
        if (!http_error_conf_1.default[error]) {
            error = error ? error : "ERR_INTERNAL_SERVER_ERROR";
        }
        res
            .status(http_error_conf_1.default[error] ? http_error_conf_1.default[error].statusCode : 400)
            .json({ success: false, data: data, error: { code: error } });
    },
};
