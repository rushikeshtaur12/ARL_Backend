import { Router } from "express";
import { getProjects, getProjectById, createProject } from "../controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", createProject); // In a real app, this should be protected

export default router;
