import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ProjectModel = sequelize.define(
  "Project",
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { paranoid: true, timestamps: false }
);
