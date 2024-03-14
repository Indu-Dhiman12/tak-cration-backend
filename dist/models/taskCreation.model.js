"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConn_1 = __importDefault(require("../util/dbConn"));
const taskCreation = dbConn_1.default.define('taskCreation', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    task: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    }
});
taskCreation.sync();
exports.default = taskCreation;
