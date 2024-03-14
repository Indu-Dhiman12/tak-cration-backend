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
const express = require("express");
const dbConn_1 = __importDefault(require("./util/dbConn"));
const index_1 = __importDefault(require("./router/user/index"));
const index_2 = __importDefault(require("./router/addTask/index"));
const upload_1 = __importDefault(require("./router/upload"));
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(express.json());
var corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
};
app.use(cors(corsOptions));
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbConn_1.default.sync({ force: false });
        yield dbConn_1.default.authenticate();
        console.log('Database Connected successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
app.use("/", index_1.default);
app.use("/", index_2.default);
app.use("/file", upload_1.default);
app.listen(PORT, () => {
    connectToDb();
    console.log(`Running on PORT ${PORT}`);
});
