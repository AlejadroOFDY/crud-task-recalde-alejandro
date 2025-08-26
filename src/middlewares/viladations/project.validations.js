import { body, param, custom } from "express-validator";
import { ProjectModel } from "../../models/project.model.js";

export const getProjectByIdValidation = [
      param("id")
        .isInt()
        .withMessage("El número ingresado deber ser un número entero"),
        custom(async (value) => {
          const users = await ProjectModel.findByPk(value);
          if (!project) {
            throw new Error("Proyecto no encontrado");
          }
          if (project.deleted) {
            throw new Error("El proyecto fue borrado")
          }
        }),
    ];

export const createProjectValidation = [
    body("name").isEmpty().withMessage("El nombre es un campo obligatorio"),
]

export const updateProjectValidation = [
      param("id")
        .isInt()
        .withMessage("El número ingresado deber ser un número entero"),
        custom(async (value) => {
          const project = await ProjectModel.findByPk(value);
          if (!project) {
            throw new Error("Proyecto no encontrado");
          }
        }),
        body("name")
        .optional()
        .isEmpty()
        .withMessage("El campo no puede estar vacío")
]

export const deleteProjectValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado deber ser un número entero"),
    custom(async (value) => {
      const project = await ProjectModel.findByPk(value);
      if (!project) {
        throw new Error("Proyecto no encontrado");
      }
    }),
];