import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define("Profile", {
    nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
},
{timestamps: false});

// Relaciones

ProfileModel.belongsTo(UserModel, {foreignKey: "user_id"});

UserModel.hasOne(ProfileModel, {foreignKey: "user_id"});