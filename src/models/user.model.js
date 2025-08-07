import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// el nombre de los modelos con la inicial en mayuscula
const UserModel = sequelize.define("User", {
    tittle: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    enamil: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
});