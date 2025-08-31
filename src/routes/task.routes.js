import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";
import { validator } from "../middlewares/validator.js";
import {
  getTaskByIdValidation,
  createTaskValidation,
  updateTaskValidation,
  deleteTaskValidation,
} from "../middlewares/viladations/task.validations.js";

const router = Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskByIdValidation, validator, getTaskById);
router.post("/", createTaskValidation, validator, createTask);
router.put("/:id", updateTaskValidation, validator, updateTask);
router.delete("/:id", deleteTaskValidation, validator, deleteTask);

export default router;
