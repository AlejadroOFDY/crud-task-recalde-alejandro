import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { ProjectModel } from "./project.model.js";

export const UserProjectModel = sequelize.define(
  "User_Project",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { timestamps: false }
);

/* UserProjectModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "users"
});

UserProjectModel.belongsTo(ProjectModel, {
  foreignKey: "project_id",
  as: "projects"
});

UserModel.hasMany(UserProjectModel, {
  foreignKey: "user_id",
  as: "users"
});

ProjectModel.hasMany(UserProjectModel, {
  foreignKey: "project_id",
  as: "projects"
}); */

UserModel.belongsToMany(ProjectModel, {
  through: UserProjectModel,
  foreignKey: "user_id",
  as: "projects",
});

ProjectModel.belongsToMany(UserModel, {
  through: UserProjectModel,
  foreignKey: "project_id",
  as: "users",
});
