import { Router } from "express";
import {
  getAllProfiles,
  createProfile,
} from "../controllers/profile.controllers.js";

const router = Router();

router.get("/", getAllProfiles);
router.post("/", createProfile);

export default router;
