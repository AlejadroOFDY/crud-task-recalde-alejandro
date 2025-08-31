import { UserModel } from "../models/user.model.js";
import { TaskModel } from "../models/task.model.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      where: { deleted: false },
      include: [
        {
          model: TaskModel,
          as: "tareas",
          attributes: ["id", "tittle", "description", "isComplete"],
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudieron obtener los usuarios",
    });
  }
};

// Buscar un usuario por id
export const getUserById = async (req, res) => {
  try {
    const users = await UserModel.findOne({
      where: { id: req.params.id, deleted: false },
      include: [
        {
          model: TaskModel,
          as: "tareas",
          attributes: ["id", "tittle", "description", "isComplete"],
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Error al obtener el usuario" });
  }
};

// crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await UserModel.create({
      name,
      email,
      password,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "No se pudo crear el usuario" });
  }
};

// modificar usuario
export const updateUser = async (req, res) => {
  try {
    const users = await UserModel.findOne({
      where: { id: req.params.id, deleted: false },
    });
    const { name, email, password } = req.body;
    await users.update({
      name: name || users.name,
      email: email || users.email,
      password: password || users.password,
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo actualizar el usuario",
    });
  }
};

// eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const users = await UserModel.findOne({
      where: { id: req.params.id, deleted: false },
    });
    await users.update({ deleted: true });
    return res.status(200).json("Se eliminó el usuario correctamente");
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "No se pudo eliminar el usuario",
    });
  }
};
