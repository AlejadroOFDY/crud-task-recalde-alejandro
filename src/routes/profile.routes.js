import { Router } from "express";
import {
  getAllProfiles,
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controllers.js";
import { validator } from "../middlewares/validator.js";
import {
  getProfileByIdValidation,
  createProfileValidation,
  updateProfileValidation,
  deleteProfileValidation,
} from "../middlewares/viladations/profile.validations.js";

const router = Router();

router.get("/", getAllProfiles);
router.get("/:id", getProfileByIdValidation, validator, getProfileById);
router.post("/", createProfileValidation, validator, createProfile);
router.put("/:id", updateProfileValidation, validator, updateProfile);
router.delete("/:id", deleteProfileValidation, validator, deleteProfile);

export default router;
