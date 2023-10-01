import { DataTypes, Model } from "sequelize";
import db from "../config/databaseConfig";
import { UserInstance } from "./userModel";

export interface todoAtrributes {
    id: string,
    description: string,
    completed: boolean,
    userId: string
}

export class todoInstance extends Model<todoAtrributes> {}

    todoInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUIDV4,
            allowNull: false
        }
},
{ sequelize: db, tableName: "todo"}
)

