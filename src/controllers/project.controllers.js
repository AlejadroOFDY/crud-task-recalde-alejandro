import { ProjectModel } from "../models/project.model.js";
import { UserModel } from "../models/user.model.js";

// conseguir todos los proyectos

export const getAllProjects = async (req, res) => {
  try {
    const project = await ProjectModel.findAll({
      where: { deleted: false },
      include: [
        {
          model: UserModel,
          as: "users",
          attributes: ["id", "name", "email"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudieron obtener los proyectos",
    });
  }
};

// buscar por id

export const getProjectById = async (req, res) => {
  try {
    const project = await ProjectModel.findOne({
      where: { id: req.params.id, deleted: false },
      include: [
        {
          model: UserModel,
          as: "creado por",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return res.status(200).json(project);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "No se pudo buscar el projecto" });
  }
};

// crear el proyecto

export const createProject = async (req, res) => {
  try {
    const { name, user_id } = req.body;
    const newProject = await ProjectModel.create({
      name,
      user_id,
    });
    return res.status(201).json(newProject);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "No se pudo crear el proyecto" });
  }
};

// modificar un proyecto

export const updateProject = async (req, res) => {
  try {
    const project = await ProjectModel.findOne({
      where: { id: req.params.id, deleted: false },
    });
    const { name } = req.body;
    await project.update({
      name: name || project.name,
    });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo actualizar el proyecto",
    });
  }
};

// borrar el proyecto

export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectModel.findOne({
      where: { id: req.params.id, deleted: false },
    });
    await project.update({ deleted: true });
    return res
      .status(200)
      .json({ message: "Se eliminó el proyecto correctamente" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo eliminar el proyecto",
    });
  }
};
