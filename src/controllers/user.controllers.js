import { UserModel } from "../models/user.model.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "No se pudieron obtener los usuarios" });
  }
};

// Buscar un usuario por id
export const getUserById = async (req, res) => {
  try {
    const users = await UserModel.findByPk(req.params.id);
    if (!users) {
      return res.status(404).json({ error: "No se encontró el usuario" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// crear usuario

// modificar usuario

// eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const users = await UserModel.findByPk(req.params.id);
    if (!users) {
      return res.status(404).json("No se encontró el usuario");
    }
    await users.destroy();
    return res
      .status(200)
      .json({ message: "Se eliminó el usuario correctamente" });
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar el usuario" });
  }
};
