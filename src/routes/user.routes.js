import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { validator } from "../middlewares/validator.js";
import {
  getUserByIdValidation,
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
} from "../middlewares/viladations/user.validations.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserByIdValidation, validator, getUserById);
router.post("/", createUserValidation, validator, createUser);
router.put("/:id", updateUserValidation, validator, updateUser);
router.delete("/:id", deleteUserValidation, validator, deleteUser);

export default router;
