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
            attributes: [], //trae un array vacío no entiendo por qué
          },
        },
      ],
      logging: console.log, // esto está para ver la consola sql para tratar de solucionar el problema de arriba
    });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudieron obtener los proyectos",
    });
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
