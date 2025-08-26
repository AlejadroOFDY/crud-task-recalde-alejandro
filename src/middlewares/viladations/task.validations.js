import { body, param, custom } from "express-validator";
import { TaskModel } from "../../models/task.model.js";

export const getTaskByIdValidation = [
    param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero"),
    custom (async (value) => {
        const task = await TaskModel.findByPk(value);
        if (!task) {
            throw new Error("No se encontró la tarea")
        }
    })
]

export const createTaskValidation = [
    body("tittle").isEmpty().isLength({min: 5, max: 100}).withMessage("El título debe tener una longitud mínima de 5 caracteres y  un máximo de 100"),
    body("description").isEmpty().withMessage("La descripción no puede estar vacía"),
    body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("El campo solo puede ser true o false"),
    custom (async (value) => {
        const task = TaskModel.findOne({where: {value}})
        if (task) {
            
        }
    })
]