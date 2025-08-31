import { Router } from "express";
import {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers.js";
import { validator } from "../middlewares/validator.js";
import {
  getProjectByIdValidation,
  createProjectValidation,
  updateProjectValidation,
  deleteProjectValidation,
} from "../middlewares/viladations/project.validations.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectByIdValidation, validator, getProjectById);
router.post("/", createProjectValidation, validator, createProject);
router.put("/:id", updateProjectValidation, validator, updateProject);
router.delete("/:id", deleteProjectValidation, validator, deleteProject);

export default router;
