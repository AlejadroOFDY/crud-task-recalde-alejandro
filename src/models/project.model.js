import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ProjectModel = sequelize.define("Project",{
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    }
},
{timestamps: false});