import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeDatabase } from "./db/config";
import projectRoutes from "./routes/projectRoutes";
import contactRoutes from "./routes/contactRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Popcorn Portfolio Backend is popping!" });
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🍿 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
