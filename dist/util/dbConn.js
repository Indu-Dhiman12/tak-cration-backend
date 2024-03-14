"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "local";
const config = require("../conf/config");
const db = {};
let sequelize;
if (config.use_env_variable) {
    sequelize = new sequelize_1.Sequelize(process.env[config.use_env_variable], config);
}
else {
    sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
}
exports.default = sequelize;
