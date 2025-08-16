import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { ProjectModel } from "./project.model.js";

export const UserProyectModel = sequelize.define(
  "User_Proyect",
  {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { timestamps: false }
);

UserModel.belongsToMany(ProjectModel, {
  through: UserProyectModel,
  foreignKey: "user_id",
  as: "projects",
});

ProjectModel.belongsToMany(UserModel, {
  through: UserProyectModel,
  foreignKey: "project_id",
  as: "users",
});
