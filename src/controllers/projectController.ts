import type { Request, Response } from "express";
import { AppDataSource } from "../db/config";
import { Project } from "../entity/Project";


export const getProjects = async (req: Request, res: Response) => {
    const projectRepository = AppDataSource.getRepository(Project);
    try {
        const projects = await projectRepository.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects", error });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    const projectRepository = AppDataSource.getRepository(Project);
    const id = parseInt(req.params.id || "0");
    try {
        const project = await projectRepository.findOneBy({ id });
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "Project not found"});
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching project", error });
    }
};

export const createProject = async (req: Request, res: Response) => {
    const projectRepository = AppDataSource.getRepository(Project);
    try {
        const project = projectRepository.create(req.body);
        const result = await projectRepository.save(project);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error });
    }
};
