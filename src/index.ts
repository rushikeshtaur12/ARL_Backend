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

// Your custom frontend domain (optional)
const FRONTEND_URL = process.env.FRONTEND_URL;
const PRODUCTION_FRONTEND = "https://arl-frontend-6uorun68f-studentconnectcommunity-9508s-projects.vercel.app";

// Allowed origins list
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  FRONTEND_URL,
  PRODUCTION_FRONTEND,
];

// CORS handler - Allow Vercel deployments and production frontend
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Allow all Vercel deployments, localhost, and production frontend
      if (
        origin.includes("vercel.app") ||
        origin.includes("localhost") ||
        origin === FRONTEND_URL ||
        origin === PRODUCTION_FRONTEND
      ) {
        callback(null, true);
      } else {
        console.log("❌ CORS Blocked Origin:", origin);
        callback(new Error("CORS BLOCKED: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Popcorn Portfolio Backend is popping!" });
});

// Root
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Popcorn Portfolio Backend is popping!" });
});

// Start server when DB is ready
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
