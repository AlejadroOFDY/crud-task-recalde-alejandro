import { Router } from "express";
import {
  getAllUserProject,
  createUserProject,
  getUserProjectById,
  deleteUserProject,
  updateUserProject,
} from "../controllers/user_project.controllers.js";
import { validator } from "../middlewares/validator.js";
import {
  getUserProjectByIdValidation,
  createUserProjectValidation,
  updateUserProjectValidation,
  deleteUserProjectValidation,
} from "../middlewares/viladations/user_project.validations.js";

const router = Router();

router.get("/", getAllUserProject);
router.get("/:id", getUserProjectByIdValidation, validator, getUserProjectById);
router.post("/", createUserProjectValidation, validator, createUserProject);
router.put("/:id", updateUserProjectValidation, validator, updateUserProject);
router.delete(
  "/:id",
  deleteUserProjectValidation,
  validator,
  deleteUserProject
);

export default router;
