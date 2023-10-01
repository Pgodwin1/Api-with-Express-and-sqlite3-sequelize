"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.upDateTodo = exports.getTodos = exports.createTodo = void 0;
const utils_1 = require("../utils/utils");
const todomodel_1 = require("../model/todomodel");
const uuid_1 = require("uuid");
const createTodo = async (req, res) => {
    try {
        const verify = req.user;
        const id = (0, uuid_1.v4)();
        const validateResult = utils_1.createTodoSchema.validate(req.body, utils_1.option);
        console.log(validateResult);
        if (validateResult.error) {
            return res.status(400).json({ Error: validateResult.error.details[0].message });
        }
        const todoRecord = await todomodel_1.todoInstance.create({
            id,
            ...req.body,
            userId: verify.id
        });
        return res.status(201).json({ msg: "Todo created successfully", todoRecord });
    }
    catch (err) {
        console.log({ msg: "cannot create todo", err });
    }
    console.log(exports.createTodo);
};
exports.createTodo = createTodo;
const getTodos = async (req, res) => {
    try {
        const limit = req.query.limit;
        const offSet = req.query.offSet;
        const getAllTodo = await todomodel_1.todoInstance.findAndCountAll({
            limit: limit,
            offset: offSet
        });
        return res.status(200).json({
            msg: "All todos, gotten",
            count: getAllTodo.count,
            todo: getAllTodo.rows
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.getTodos = getTodos;
const upDateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        const validateResult = utils_1.updateTodoSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.status(400)
                .json({ Error: validateResult.error.details[0].message });
        }
        const upDateTodo = await todomodel_1.todoInstance.findOne({
            where: { id: id },
        });
        if (!upDateTodo) {
            return res.status(400).json({
                error: "Todo not found"
            });
        }
        const updateRecord = await upDateTodo.update({
            completed
        });
        return res.status(200).json({
            msg: "Todo updateded successfully", updateRecord
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.upDateTodo = upDateTodo;
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await todomodel_1.todoInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                error: "cannot find record"
            });
        }
        const deleteRecord = await record.destroy();
        return res.status(200).json({
            msg: "Todo deleted successfully", deleteRecord
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteTodo = deleteTodo;
