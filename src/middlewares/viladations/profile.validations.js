import { body, param, custom } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";

export const getProfileByIdValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado deber ser un número entero"),
    custom(async (value) => {
      const profile = await ProfileModel.findByPk(value);
      if (!profile) {
        throw new Error("Usuario no encontrado");
      }
    }),
];

export const createProfileValidation = [
  body("nickname").notEmpty().withMessage("El nombre es un campo obligatorio"),
  custom(async (nickname) => {
    const profile = await ProfileModel.findOne({ where: { nickname } });
    if (profile) {
      throw new Error("El nickname ya está en uso");
    }
  }),
];

export const updateProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un número entero"),
  custom(async (nickname) => {
    const profile = await ProfileModel.findOne({ where: { nickname } });
    if (profile) {
      throw new Error("El nickname ya está en uso");
    }
  }),
  body("nickname")
    .optional()
    .isEmpty()
    .withMessage("El nickname no puede estar vacío") //Esto probablemente sea innecesario, pero lo dejo para tenerlo como referencia futura, en este caso está el optional y empty, porque no es obligatorio pero si el usuario lo manda no puede estar vacío
    .isString()
    .isLength({ min: 2, max: 15 }),
];

export const deleteProfileValidation = [
  param("id")
    .isInt()
    .withMessage("El número ingresado debe ser un número entero"),
    custom(async(id) => {
        const profile = await ProfileModel.findOne({where: {profile}});
        if(!profile) {
            throw new Error("Perfil no encontrado")
        }
    })
];
