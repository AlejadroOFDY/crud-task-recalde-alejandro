import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          as: "creado por",
          attributes: ["id", "name", "email"],
          where: { deleted: false },
        },
      ],
    });
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudieron obtener las tareas",
    });
  }
};

// Buscar una tarea por id
export const getTaskById = async (req, res) => {
  try {
    const tasks = await TaskModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          as: "creado por",
          attributes: ["id", "name", "email"],
          where: { deleted: false },
        },
      ],
    });
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Error al obtener la tarea" });
  }
};

// crear tarea
export const createTask = async (req, res) => {
  try {
    const { tittle, description, isComplete, user_id } = req.body;
    const newTask = await TaskModel.create({
      tittle,
      description,
      isComplete,
      user_id,
    });
    return res.status(201).json(newTask);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "No se pudo crear la tarea" });
  }
};

// modificar tarea
export const updateTask = async (req, res) => {
  try {
    const { tittle, description, isComplete } = req.body;
    await tasks.update({
      tittle: tittle || tasks.tittle,
      description: description || tasks.description,
      isComplete: isComplete || tasks.isComplete,
    });
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Error al actualizar la tarea" });
  }
};

// eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const tasks = await TaskModel.findByPk(req.params.id);
    await tasks.destroy();
    return res
      .status(200)
      .json({ message: "Se eliminó la tarea correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "No se pudo eliminar la tarea" });
  }
};
