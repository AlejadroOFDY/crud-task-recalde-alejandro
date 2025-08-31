import { ProjectModel } from "../models/project.model.js";
import { UserModel } from "../models/user.model.js";
import { UserProjectModel } from "../models/user_project.model.js";

// todas las relaciones usuarios-proyectos
export const getAllUserProject = async (req, res) => {
  try {
    const userProject = await UserProjectModel.findAll({
      include: [
        {
          model: UserModel,
          as: "users",
          attributes: ["name", "email"],
          where: { deleted: false },
        },
        {
          model: ProjectModel,
          as: "projects",
          attributes: ["name"],
          where: { deleted: false },
        },
      ],
    });
    return res.status(200).json(userProject);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo obtener la relación usuarios-proyectos",
    });
  }
};

// obtener la relacion usuario-proyecto por id
export const getUserProjectById = async (req, res) => {
  try {
    const userProject = await UserProjectModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          as: "users",
          attributes: ["id", "name", "email"],
          where: { deleted: false },
        },
        {
          model: ProjectModel,
          as: "projects",
          attributes: ["name"],
          where: { deleted: false },
        },
      ],
    });
    return res.status(200).json(userProject);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo buscar la relación usuario-proyecto",
    });
  }
};

// crear relacion usuario-proyecto
export const createUserProject = async (req, res) => {
  try {
    const { user_id, project_id } = req.body;
    const existingRelation = await UserProjectModel.findOne({
      where: { user_id, project_id },
    });
    if (existingRelation) {
      return res.status(500).json("Ya existe la relación usuario-proyecto");
    }
    const newUserProject = await UserProjectModel.create({
      user_id,
      project_id,
    });
    return res.status(201).json(newUserProject);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo relacionar el usuario con su proyecto",
    });
  }
};

// modificar la relacion usuario-proyecto
export const updateUserProject = async (req, res) => {
  try {
    const userProject = await UserProjectModel.findByPk(req.params.id);
    const { user_id, project_id } = req.body;
    await userProject.update({
      user_id: user_id || userProject.user_id,
      project_id: project_id || userProject.project_id,
    });
    return res.status(200).json(userProject);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo actualizar la relacion usuario-proyecto",
    });
  }
};

// eliminar la relacion usuario-proyecto
export const deleteUserProject = async (req, res) => {
  try {
    const userProject = await UserProjectModel.findByPk(req.params.id);
    await userProject.destroy();
    return res
      .status(200)
      .json({ message: "Se eliminó la relación usuario-proyecto" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo eliminar la relación usuario-proyecto",
    });
  }
};
