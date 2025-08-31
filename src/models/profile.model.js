import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define(
  "Profile",
  {
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },
  // preguntarle al profe después sobre esto
  // Buscando, sequelize me creará la columna user_id automáticamente cuando quiera crear el perfil, sin embargo dejo esto para saberlo a futuro
  /* user_id: {  // ✅ Explícito (para validaciones/claridad)
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {  // Opcional: refuerza la relación a nivel de BD
      model: UserModel, // Apunta al modelo User
      key: "id",       // Usa el campo "id" de User
    },
  },
  y tampoco podré usar validaciones personalizadas */
  { timestamps: false }
);

// Relaciones

ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});
