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
exports.viewFile = exports.download = exports.upload = void 0;
const upload_1 = __importDefault(require("../../middleware/upload"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield (0, upload_1.default)(req, res);
        if (req.file == undefined) {
            return res.status(400).send({
                status: false,
                message: "Please provide a file",
                data: null
            });
        }
        res.status(200).send({
            success: true,
            message: "Uploaded the file successfully",
            data: process.env.BASE_URL + req.file.filename
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: `Could not upload the file:. ${err}`,
        });
    }
});
exports.upload = upload;
const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = "./upload/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};
exports.download = download;
const viewFile = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = "./upload/";
    const filePath = path_1.default.join(directoryPath, fileName);
    fs_1.default.access(filePath, fs_1.default.constants.R_OK, (err) => {
        if (err) {
            res.status(404).send({
                message: "File not found or not accessible.",
            });
        }
        else {
            const fileStream = fs_1.default.createReadStream(filePath);
            // Set appropriate Content-Type header based on the file extension
            const ext = path_1.default.extname(filePath);
            const contentType = getContentType(ext);
            res.set("Content-Type", contentType);
            fileStream.pipe(res);
        }
    });
};
exports.viewFile = viewFile;
// Helper function to get the Content-Type based on file extension
function getContentType(ext) {
    switch (ext.toLowerCase()) {
        case ".pdf":
            return "application/pdf";
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        case ".png":
            return "image/png";
        case ".zip":
            return "application/zip";
        case ".mp4":
            return "video/mp4";
        case ".webm":
            return "video/webm";
        case ".avi":
            return "video/x-msvideo";
        case ".mpeg":
            return "video/mpeg";
        case "..ogv":
            return "video/ogg";
        // Add more cases for other file types as needed
        default:
            return "application/octet-stream"; // Fallback to binary data
    }
}
