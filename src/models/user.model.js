import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const task = sequelize.define("Task", {
    tittle: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    enamil: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
});