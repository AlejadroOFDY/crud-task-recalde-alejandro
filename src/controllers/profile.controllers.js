import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";

// obtener todo
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll();
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
        },
      ],
    });
    if (!profile) {
      return res.status(404).json({ message: "No se encontró el perfil" });
    }
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
    console.log(req.body);
    if (!nickname || !user_id) {
      return res
        .status(400)
        .json("El nickname y el id de usuario son  campos obligatorios");
    }
    if (nickname.length > 20) {
      return res.status(400).json("El límite de caracteres es 20");
    }
    const user = await UserModel.findByPk(user_id);
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }
    const existingProfile = await ProfileModel.findOne({ where: { user_id } });
    if (existingProfile) {
      return res.status(400).json("El usuario ya tiene un perfil");
    }
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
    const profile = await ProfileModel.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "No se encontró el perfil" });
    }
    const { nickname } = req.body;
    if (nickname && (await ProfileModel.findOne({ where: { nickname } }))) {
      return res
        .status(500)
        .json({ message: "El nombre del perfil ya se encuentra en uso" });
    }
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
