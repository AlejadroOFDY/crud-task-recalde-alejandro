import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { Op } from "sequelize";

export const getUserByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un número entero")
    .custom(async (value) => {
      const users = await UserModel.findByPk(value);
      if (!users) {
        throw new Error("Usuario no encontrado");
      }
    }),
];

export const createUserValidation = [
  body("name").notEmpty().withMessage("El nombre es un campo obligatorio"),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("El email es un campo obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es un campo obligatorio")
    .custom(async (email) => {
      const users = await UserModel.findOne({ where: { email } });
      if (users) {
        throw new Error("El email ya se encuentra registrado");
      }
    }),
];

export const updateUserValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado deber ser un número entero")
    .custom(async (value) => {
      const users = await UserModel.findByPk(value);
      if (!users) {
        throw new Error("Usuario no encontrado");
      }
    }),
  body("name")
    .optional()
    .isEmpty()
    .withMessage("El nombre no puede estar vacío"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("El email debe ser válido")
    .custom(async (value, { req }) => {
      const email = await UserModel.findOne({
        where: {
          email: value,
          id: { [Op.ne]: req.params.id }, // Excluir el usuario actual
        },
      });
      if (email) {
        throw new Error("El email ingresado ya se encuentra registrado");
      }
    }),
  body("password")
    .optional()
    .isEmpty()
    .isAlphanumeric()
    .withMessage("La contraseña debe contener letras y al menos un número")
    .optional(),
];

export const deleteUserValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado deber ser un número entero")
    .custom(async (value) => {
      const users = await UserModel.findByPk(value);
      if (!users) {
        throw new Error("Usuario no encontrado");
      }
    }),
];
