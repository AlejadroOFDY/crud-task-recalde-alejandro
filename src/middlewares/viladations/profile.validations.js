import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { Op } from "sequelize";

export const getProfileByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado deber ser un número entero")
    .custom(async (value) => {
      const profile = await ProfileModel.findByPk(value);
      if (!profile) {
        throw new Error("Usuario no encontrado");
      }
    }),
];

export const createProfileValidation = [
  body("nickname")
    .notEmpty()
    .withMessage("El nombre es un campo obligatorio")
    .isLength({ max: 20 })
    .withMessage("El nickname debe ser menor a 21 caracteres")
    .custom(async (value) => {
      const profile = await ProfileModel.findOne({ where: { value } });
      if (profile) {
        throw new Error("El nickname ya está en uso");
      }
    }),
  body("user_id")
    .isInt()
    .withMessage("El número ingresado deber ser un número entero")
    .notEmpty()
    .withMessage("El id del usuario es un campo obligatorio")
    .custom(async (user_id) => {
      const users = await ProfileModel.findOne({ where: { user_id } });
      if (users) {
        throw new Error("El usuario ingresado ya tiene un perfil");
      }
    }),
];

export const updateProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un número entero")
    .custom(async (value) => {
      const profile = await ProfileModel.findOne({ where: { value } });
      if (!profile) {
        throw new Error("Perfil no encontrado");
      }
    }),
  body("nickname")
    .optional()
    .notEmpty()
    .withMessage("El nickname no puede estar vacío") //Esto probablemente sea innecesario, pero lo dejo para tenerlo como referencia futura, en este caso está el optional y empty, porque no es obligatorio pero si el usuario lo manda no puede estar vacío
    .isString()
    .isLength({ max: 20 })
    .withMessage("El nickname debe ser menor a 21 caracteres")
    .custom(async (value, { req }) => {
      const existingNickname = await ProfileModel.findOne({
        where: { profile: value, id: { [Op.ne]: req.params.id } },
      });
      if (existingNickname) {
        throw new Error("El nickname ya se encuentra en uso");
      }
    }),
];

export const deleteProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un número entero")
    .custom(async (value) => {
      const profile = await ProfileModel.findByPk(value);
      if (!profile) {
        throw new Error("Perfil no encontrado");
      }
    }),
];
