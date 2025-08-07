import { BOOLEAN, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const task = sequelize.define("Task", {
    tittle: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});