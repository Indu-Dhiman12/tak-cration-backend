"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = require("../../controllers/upload");
const express_1 = require("express");
const router = (0, express_1.Router)();
// file Routes
router.get('/:name', upload_1.viewFile);
router.post('/upload', upload_1.upload);
exports.default = router;
