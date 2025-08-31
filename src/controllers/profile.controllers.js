import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

// obtener todo
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll({
      include: [
        {
          model: UserModel,
          as: "creado por",
          attributes: ["id", "name", "email"],
          where: { deleted: false },
        },
      ],
    });
    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudieron obtener los perfiles",
    });
  }
};

// obtener por id
export const getProfileById = async (req, res) => {
  try {
    const profile = await ProfileModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          as: "creado por",
          attributes: ["id", "name", "email"],
          where: { deleted: false },
        },
      ],
    });
    return res.status(200).json(profile);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "No se pudo buscar el perfil" });
  }
};

// crear
export const createProfile = async (req, res) => {
  try {
    const { nickname, user_id } = req.body;
    const newProfile = await ProfileModel.create({
      nickname,
      user_id,
    });
    return res.status(201).json(newProfile);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "No se pudo crear el perfil" });
  }
};

// actualizar
export const updateProfile = async (req, res) => {
  try {
    const { nickname } = req.body;
    await profile.update({
      nickname: nickname || profile.nickname,
    });
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo actualizar el perfil",
    });
  }
};

// borrar
export const deleteProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "No se encontró el perfil" });
    }
    await profile.destroy();
    return res
      .status(200)
      .json({ message: "Se eliminó el perfil correctamente" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "No se pudo eliminar el perfil",
    });
  }
};
