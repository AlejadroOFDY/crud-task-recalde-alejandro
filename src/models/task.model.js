import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const TaskModel = sequelize.define(
  "Task",
  {
    tittle: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
); // evita que cree el createdAt y el updatedAt

// Relaciones

TaskModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "creado por",
});
UserModel.hasMany(TaskModel, {
  foreignKey: "user_id",
  as: "tareas",
  onDelete: "CASCADE",
});
