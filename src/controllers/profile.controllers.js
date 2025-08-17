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
