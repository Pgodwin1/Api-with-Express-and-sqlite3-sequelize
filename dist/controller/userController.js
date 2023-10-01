"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = exports.getUserAndTodo = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const userModel_1 = require("../model/userModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const todomodel_1 = require("../model/todomodel");
const jwtsecret = process.env.JWT_SECRET;
const getUserAndTodo = async (req, res) => {
    try {
        const getAllUser = await userModel_1.UserInstance.findAndCountAll({
            include: [
                {
                    model: todomodel_1.todoInstance,
                    as: "todos",
                }
            ]
        });
        return res.status(200).json({
            msg: "All todos, gotten",
            count: getAllUser.count,
            users: getAllUser.rows
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.getUserAndTodo = getUserAndTodo;
const Register = async (req, res) => {
    try {
        const { email, fullName, password, confirm_password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        const validateResult = utils_1.registerUserSchema.validate(req.body, utils_1.option);
        if (validateResult.error) {
            return res.render("Register", {
                error: validateResult.error.details[0].message
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, await bcryptjs_1.default.genSalt());
        const user = await userModel_1.UserInstance.findOne({
            where: { email: email },
        });
        if (!user) {
            const newUser = await userModel_1.UserInstance.create({
                id: iduuid,
                email,
                fullName,
                password: passwordHash,
            });
            return res.redirect("/Login");
        }
        return res.render("Register", { error: "User already exist" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    const { email, password } = req.body;
    const validateResult = utils_1.loginUserSchema.validate(req.body, utils_1.option);
    if (validateResult.error) {
        return res.status(400).json({
            Error: validateResult.error.details[0].message
        });
    }
    const User = await userModel_1.UserInstance.findOne({
        where: { email: email },
    });
    const { id } = User;
    const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "1d" });
    res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    const validUser = await bcryptjs_1.default.compare(password, User.password);
    if (validUser) {
        res.render("dashboard");
    }
    return res.render("Login", { error: "Invalid credentials" });
};
exports.Login = Login;
