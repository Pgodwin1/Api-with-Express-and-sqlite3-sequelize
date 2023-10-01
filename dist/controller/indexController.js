"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const utils_1 = require("../utils/utils");
const Register = async (req, res) => {
    try {
        const { email, fullName, password, confirm_password } = req.body;
        const validateResult = utils_1.registerUserSchema.validate(req.body);
        console.log(validateResult);
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
