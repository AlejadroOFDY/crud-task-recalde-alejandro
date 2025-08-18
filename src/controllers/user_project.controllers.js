import { ProjectModel } from "../models/project.model.js";
import { UserModel } from "../models/user.model.js";
import { UserProjectModel } from "../models/user_project.model.js";

// todos los proyectos con los usuarios

export const getAllUserProject = async (req, res) => {
    try {
        const userProject = await UserProjectModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: "users",
                    attributes: ["name", "email"]
                },
                {
                    model: ProjectModel,
                    as: "projects",
                    attributes: ["name"]
                }
            ]
        });
        return res.status(200).json(userProject)
    } catch (error) {
        return res.status(500).json({error: error.message, message: "No se pudieron obtener los usuarios y sus proyectos"})
    }
}

export const createUserProject = async (req, res) => {
    try {
        const {user_id, project_id} = req.body;
        console.log(req.body);
        if (!user_id || !project_id) {
            return res.status(400).json("Faltan campos obligatorios");
        }
        const newUserProject = UserProjectModel.create({
            user_id,
            project_id
        });
        return res.status(201).json(newUserProject)
    } catch (error) {
        return res.status(500).json({error: error.message, message: "No se pudo relacionar el usuario con su proyecto"})
    }
}