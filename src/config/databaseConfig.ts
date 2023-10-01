import { Sequelize } from "sequelize";

const db = new Sequelize("database", "username", "password", {
    storage: "database.sqlite",
    dialect: "sqlite",
    logging: false
});

export default db;