import { UserModel } from "../models/user.model.js";
import { TaskModel } from "../models/task.model.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
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
    const users = await UserModel.findByPk(req.params.id, {
      include: [
        {
          model: TaskModel,
          as: "tareas",
          attributes: ["id", "tittle", "description", "isComplete"],
        },
      ],
    });
    if (!users) {
      return res.status(404).json({ error: "No se encontró el usuario" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      return res.status(400).json("Faltan campos obligatorios");
    }
    const newUser = await UserModel.create({
      name,
      email,
      password,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo crear el usuario" });
  }
};

// modificar usuario
export const updateUser = async (req, res) => {
  try {
    const users = await UserModel.findByPk(req.params.id);
    if (!users) {
      return res.status(404).json("No se encontró el usuario");
    }
    const { name, email, password } = req.body;

    if (email && (await UserModel.findOne({ where: { email } }))) {
      return res.status(400).json("El email ya está en uso");
    }

    await users.update({
      name: name || users.name,
      email: email || users.email,
      password: password || users.password,
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo actualizar el usuario" });
  }
};

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
