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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../util/auth");
const accessControl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authToken = (_a = req.header("authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!authToken) {
        return res.status(401).json({
            error: {
                code: "ERR_ACCESS_TOKEN_MISSING",
                message: "Authorization-Header is not set",
            },
        });
    }
    const { data, error } = yield (0, auth_1.checkAccessToken)(authToken);
    if (error) {
        switch (error.name) {
            case "JsonWebTokenError":
                return res
                    .status(403)
                    .json({ error: { code: "ERR_INVALID_ACCESS_TOKEN" } });
            case "TokenExpiredError":
                return res
                    .status(403)
                    .json({ error: { code: "ERR_ACCESS_TOKEN_EXPIRED" } });
            default:
                return res
                    .status(403)
                    .json({ error: { code: "ERR_INVALID_ACCESS_TOKEN" } });
        }
    }
    req.user = data.user;
    next();
});
exports.default = accessControl;
