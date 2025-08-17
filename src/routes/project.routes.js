import { Router } from "express";
import {
  getAllProjects,
  createProject,
} from "../controllers/project.controllers.js";

const router = Router();

router.get("/", getAllProjects);
router.post("/", createProject);

export default router;
