import { Router } from "express";
import {
  getAllUserProject,
  createUserProject,
  getUserProjectById,
  deleteUserProject,
  updateUserProject,
} from "../controllers/user_project.controllers.js";

const router = Router();

router.get("/", getAllUserProject);
router.get("/:id", getUserProjectById);
router.post("/", createUserProject);
router.put("/:id", updateUserProject);
router.delete("/:id", deleteUserProject);

export default router;
