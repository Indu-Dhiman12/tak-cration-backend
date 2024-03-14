"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validation_1 = require("express-validation");
const r = (err, req, res, next) => {
    if (err instanceof express_validation_1.ValidationError) {
        return res.sendError(res, "ERR_VALIDATION", err.details);
    }
    console.error(err);
    return res.sendError(res, "ERR_INTERNAL_SERVER_ERROR");
};
exports.default = r;
