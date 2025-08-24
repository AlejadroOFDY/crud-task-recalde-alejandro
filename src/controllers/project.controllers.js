import { ProjectModel } from "../models/project.model.js";
import { UserModel } from "../models/user.model.js";

// conseguir todos los proyectos

export const getAllProjects = async (req, res) => {
  try {
    const project = await ProjectModel.findAll({
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
    const project = await ProjectModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          as: "creado por",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    if (!project) {
      return res.status(404).json({ message: "No se encontró el projecto" });
    }
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
    console.log(req.body);
    if (!name || !user_id) {
      return res
        .status(400)
        .json(
          "El nombre del proyecto y el id del usuario son campos obligatorios"
        );
    }
    if (name.length > 30) {
      return res.status(400).json("El límite de caracteres es 30");
    }
    const user = await UserModel.findByPk(user_id);
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }
    const newProject = await ProjectModel.create({
      name,
      user_id,
    });
    return res.status(201).json(newProject);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "No se pudo crear el proyecto" });
  }
};

// modificar un proyecto

export const updateProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "No se encontró el proyecto" });
    }
    const { name } = req.body;
    if (name && (await ProjectModel.findOne({ where: { name } }))) {
      return res
        .status(500)
        .json({ message: "El nombre del proyecto ya se encuentra en uso" });
    }
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
    const project = await ProjectModel.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "No se encontró el proyecto" });
    }
    await project.destroy();
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
