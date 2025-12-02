import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Project } from "../entity/Project";
import { ContactSubmission } from "../entity/ContactSubmission";

config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.POSTGRES_URL || "",
    ssl: { rejectUnauthorized: false },
    synchronize: true,
    logging: false,
    entities: [Project, ContactSubmission],
    subscribers: [],
    migrations: [],
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Database connection established successfully");
    } catch (error) {
        console.error("❌ Error during Data Source initialization:", error);
        throw error;
    }
};
