import { body, param, custom } from "express-validator";
import { UserProjectModel } from "../../models/user_project.model.js";
import { UserModel } from "../../models/user.model.js";
import { ProjectModel } from "../../models/project.model.js";

export const getUserProjectByIdValidation = [
    param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero")
    .custom (async (value) => {
        const user_project = await UserProjectModel.findByPk(value);
        if (!user_project) {
            throw new Error("No se encontró la relación usuario-proyecto")
        }
    })

]

export const createUserProjectValidation = [
    body("user_id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero"),
    body("project_id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero"),
    custom(async(value) => {
        const users = await UserModel.findByPk(value);
        const project = await ProjectModel.findByPk(value);
        if (users && project) {
            throw new Error("Ya existe esta relación usuario-proyecto")
        }
    })
    
]

export const updateUserProjectValidation = [
    param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero")
    .custom (async (value) => {
        const user_project = await UserProjectModel.findByPk(value)
        if (!user_project) {
            throw new Error ("No se encontró la relación usuario-proyecto")
        }
    })
]

export const deleteUserProjectValidation = [
    param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero")
    .custom (async (value) => {
        const user_project = await UserProjectModel.findByPk(value);
        if (!user_project) {
            throw new Error("No se encontró la relación usuario-proyecto")
        }
    })
]