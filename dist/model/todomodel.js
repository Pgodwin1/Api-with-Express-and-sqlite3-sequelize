"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoInstance = void 0;
const sequelize_1 = require("sequelize");
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
class todoInstance extends sequelize_1.Model {
}
exports.todoInstance = todoInstance;
todoInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false
    }
}, { sequelize: databaseConfig_1.default, tableName: "todo" });
