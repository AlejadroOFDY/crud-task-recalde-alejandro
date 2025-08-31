import { body, param } from "express-validator";
import { ProjectModel } from "../../models/project.model.js";
import { UserModel } from "../../models/user.model.js";

export const getProjectByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado deber ser un número entero")
    .custom(async (value) => {
      const project = await ProjectModel.findByPk(value);
      if (!project) {
        throw new Error("Proyecto no encontrado");
      }
    }),
];

export const createProjectValidation = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es un campo obligatorio")
    .isLength({ max: 30 })
    .withMessage("El nombre debe ser menor a 31 caracteres"),
  body("user_id")
    .notEmpty()
    .withMessage("El id del usuario es un campo obligatorio")
    .isInt()
    .withMessage("El número ingresado debe ser un entero")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) {
        throw new Error("No se encontró al usuario");
      }
    }),
];

export const updateProjectValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado deber ser un número entero")
    .custom(async (value) => {
      const project = await ProjectModel.findByPk(value);
      if (!project) {
        throw new Error("Proyecto no encontrado");
      }
    }),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre es un campo obligatorio")
    .isLength({ max: 30 })
    .withMessage("El nombre debe ser menor a 31 caracteres"),
];

export const deleteProjectValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado deber ser un número entero")
    .custom(async (value) => {
      const project = await ProjectModel.findByPk(value);
      if (!project) {
        throw new Error("Proyecto no encontrado");
      }
    }),
];
