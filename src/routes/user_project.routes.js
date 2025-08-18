import { Router } from "express";
import {
    getAllUserProject,
    createUserProject
} from "../controllers/user_project.controllers.js"

const router = Router();

router.get("/", getAllUserProject);
router.post("/", createUserProject);

export default router;