"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const jwtsecret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "kindly sign in" });
    }
    const token = authorization.slice(7, authorization.length);
    let verified = jsonwebtoken_1.default.verify(token, jwtsecret);
    if (!verified) {
        return res.status(401).json({ error: "invalid token" });
    }
    const { id } = verified;
    const User = await userModel_1.UserInstance.findOne({ where: { id } });
    if (!User) {
        return res.status(401).json({ error: "Kindly sign up" });
    }
    req.user = verified;
    next();
}
exports.auth = auth;
