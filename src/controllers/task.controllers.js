import { TaskModel } from "../models/task.model.js";

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "No se pudieron obtener las tareas" });
  }
};

// Buscar una tarea por id
export const getTaskById = async (req, res) => {
  try {
    const tasks = await TaskModel.findByPk(req.params.id);
    if (!tasks) {
      return res.status(404).json({ error: "No se encontró la tarea" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la tarea" });
  }
};

// crear tarea

// modificar tarea

// eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const tasks = await TaskModel.findByPk(req.params.id);
    if (!tasks) {
      return res.status(404).json("No se encontró la tarea");
    }
    await tasks.destroy();
    return res
      .status(200)
      .json({ message: "Se eliminó la tarea correctamente" });
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar la tarea" });
  }
};
