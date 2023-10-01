import { DataTypes, Model } from "sequelize";
import db from "../config/databaseConfig";
import { todoInstance } from "./todomodel";

export interface UserAtrributes {
    id: string;
    email: string;
    fullName: string;
    password: string;
}

export class UserInstance extends Model<UserAtrributes> {}

    UserInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
},
{ sequelize: db, tableName: "user"}
)

UserInstance.hasMany(todoInstance, {foreignKey: 'userId', as: "todos"})
todoInstance.belongsTo(UserInstance, {foreignKey: 'userId', as: "user"})