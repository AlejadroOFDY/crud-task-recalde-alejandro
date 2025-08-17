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
        },
      ],
    });
    if (!tasks) {
      return res.status(404).json("No se encontró la tarea");
    }
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
    console.log(req.body);
    if (!tittle || !description || !user_id) {
      return res.status(400).json("Faltan campos obligatorios");
    }
    const existingTittle = await findOne({ where: tittle });
    if (existingTittle) {
      return res.status(400).json("El título ya está en uso");
    }
    const user = await UserModel.findByPk(user_id);
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }
    const newTask = await TaskModel.create({
      tittle,
      description,
      isComplete,
      user_id,
    });
    return res.status(200).json(newTask);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "No se pudo crear la tarea" });
  }
};

// modificar tarea
export const updateTask = async (req, res) => {
  try {
    const tasks = await TaskModel.findByPk(req.params.id);
    if (!tasks) {
      return res.status(404).json("No se encontró la tarea");
    }
    const { tittle, description, isComplete } = req.body;

    if (tittle && (await TaskModel.findOne({ where: { tittle } }))) {
      return res.status(400).json("El título ya está en uso");
    }

    await tasks.update({
      tittle: tittle || tasks.tittle,
      description: description || tasks.description,
      isComplete: isComplete || tasks.isComplete,
    });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "Error al actualizar la tarea" });
  }
};

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
    res
      .status(500)
      .json({ error: error.message, message: "No se pudo eliminar la tarea" });
  }
};
