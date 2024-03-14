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
exports.getcompleteTask = exports.completeTask = exports.getSingleTask = exports.editTask = exports.deleteTask = exports.getTask = exports.addTask = void 0;
const taskCreation_model_1 = __importDefault(require("../../models/taskCreation.model"));
const auth_1 = require("../../util/auth");
const sequelize_1 = require("sequelize");
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authToken = (_a = req.header("authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    const { data } = yield (0, auth_1.checkAccessToken)(authToken);
    try {
        const taskName = req.body.task;
        const existingTask = yield taskCreation_model_1.default.findOne({ where: { task: taskName, user: data.user._id.toString() } });
        if (existingTask) {
            return res.status(400).json({ error: "Task already Exists" });
        }
        const createTask = {
            task: taskName,
            user: data.user._id
        };
        const user = yield taskCreation_model_1.default.create(createTask);
        return res.status(201).json({ data: user, status: 201 });
    }
    catch (error) {
        console.error("Error appending data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.addTask = addTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const authToken = (_b = req.header("authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", "");
    const { data } = yield (0, auth_1.checkAccessToken)(authToken);
    try {
        const tasks = yield taskCreation_model_1.default.findAll({
            where: {
                user: data.user._id.toString(),
                status: false
            },
        });
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getTask = getTask;
const getSingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield taskCreation_model_1.default.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        return res.status(200).json(task);
    }
    catch (error) {
        console.error("Error fetching single task:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getSingleTask = getSingleTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id; // Assuming you pass the task ID as a route parameter
        const task = yield taskCreation_model_1.default.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        yield task.destroy();
        return res.status(204).json({ success: true, message: "Task successfully deleted" });
    }
    catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteTask = deleteTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const { task: updatedTaskName, id: id } = req.body;
        const task = yield taskCreation_model_1.default.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        task.task = updatedTaskName;
        task.id = id;
        yield task.save();
        return res.status(200).json({ success: true, message: "Task successfully updated", task: updatedTaskName });
    }
    catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.editTask = editTask;
const completeTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const tasksArray = req.body.id;
        const status = yield taskCreation_model_1.default.update({
            status: true
        }, { where: { id: { [sequelize_1.Op.in]: req.body.id } } });
        return res.status(200).json({ status: status, message: 'Tasks completed successfully' });
        //         else {
        //     return res.status(400).json({ error: 'Invalid input or empty array' });
        // }
    }
    catch (error) {
        console.error("Error updating tasks:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.completeTask = completeTask;
const getcompleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const authToken = (_c = req.header("authorization")) === null || _c === void 0 ? void 0 : _c.replace("Bearer ", "");
    const { data } = yield (0, auth_1.checkAccessToken)(authToken);
    try {
        const tasks = yield taskCreation_model_1.default.findAll({
            where: {
                user: data.user._id.toString(),
                status: true
            },
        });
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getcompleteTask = getcompleteTask;
