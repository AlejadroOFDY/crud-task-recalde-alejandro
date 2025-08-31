import { body, param } from "express-validator";
import { TaskModel } from "../../models/task.model.js";
import { UserModel } from "../../models/user.model.js";
import { Op } from "sequelize";

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
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage("El título debe tener menos de 100 caracteres")
    .custom(async (value) => {
      const task = TaskModel.findOne({ where: { value } });
      if (task) {
        throw new Error("El título ya está en uso");
      }
    }),
  body("description")
    .notEmpty()
    .withMessage("La descripción no puede estar vacío")
    .isLength({ max: 100 })
    .withMessage("La descripción debe tener menos de 100 caracteres"),
  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("El campo solo puede ser true o false"),
  body("user_id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero")
    .notEmpty()
    .withMessage("El id del usuario es obligatorio")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) {
        throw new Error("No se encontró al usuario");
      }
    }),
];

export const updateTaskValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un entero")
    .custom(async (value) => {
      const task = await TaskModel.findByPk(value);
      if (!task) {
        throw new Error("No se encontró la tarea");
      }
    }),
  body("tittle")
    .optional()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .custom(async (value, { req }) => {
      const task = await TaskModel.findOne({
        where: { tittle: value, id: { [Op.ne]: req.params.id } },
      });
      if (task) {
        throw new Error("El título ya está en uso");
      }
    }),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía"),
  body("isComplete")
    .optional()
    .isBoolean()
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
