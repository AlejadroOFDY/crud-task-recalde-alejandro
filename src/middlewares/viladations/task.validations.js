import { body, param, custom } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
// import { Op } from "sequelize";

export const getTaskByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero")
    .custom(async (value) => {
      const task = await TaskModel.findByPk(value);
      if (!task) {
        throw new Error("No se encontró la tarea");
      }
    }),
];

export const createTaskValidation = [
  body("tittle")
    .isEmpty()
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "El título debe tener una longitud mínima de 5 caracteres y  un máximo de 100"
    ),
  body("description")
    .isEmpty()
    .withMessage("La descripción no puede estar vacía"),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("El campo solo puede ser true o false")
    .custom(async (value) => {
      const task = TaskModel.findOne({ where: { value } });
      if (task) {
        throw new Error("Ya existe esta tarea");
      }
    }),
];

export const updateTaskValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero")
    .custom(async (value) => {
      const task = await TaskModel.findByPk(/*{[Op.ne]: value}*/ value); // forma de usarlo
      if (task) {
        throw new Error("Ya existe esta tarea");
      }
    }),
  body("tittle")
    .optional()
    .isEmpty()
    .withMessage("El título no puede estar vacío"),
  body("description")
    .optional()
    .isEmpty()
    .withMessage("La descripción no puede estar vacía"),
  body("isComplete")
    .optional.isBoolean()
    .withMessage("is Complete solo puede ser true o false"),
];

export const deleteTaskValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero")
    .custom(async (value) => {
      const task = await TaskModel.findByPk({ [Op.ne]: value });
      if (!task) {
        throw new Error("No existe esta tarea");
      }
    }),
];
