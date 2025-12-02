import type { Request, Response } from "express";
import { AppDataSource } from "../db/config";
import { ContactSubmission } from "../entity/ContactSubmission";

export const submitContact = async (req: Request, res: Response) => {
    const contactRepository = AppDataSource.getRepository(ContactSubmission);
    try {
        const submission = contactRepository.create(req.body);
        const result = await contactRepository.save(submission);
        res.status(201).json({ message: "Message sent successfully!", submission: result });
    } catch (error) {
        res.status(500).json({ message: "Error sending message", error });
    }
};
