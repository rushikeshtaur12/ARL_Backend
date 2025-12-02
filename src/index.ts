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


app.use(
  cors({
    origin: "*",     // allow all frontends (safe for public API)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Root route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Start server after DB connects
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
