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

// ALL FRONTEND ALLOWED
const allowedPatterns = [
  /localhost/,
  /vercel\.app/,
  /studentconnectcommunity-9508s-projects\.vercel\.app/
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman, mobile apps

      const isAllowed = allowedPatterns.some((pattern) =>
        pattern.test(origin)
      );

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("❌ CORS BLOCKED:", origin);
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
  res.json({ status: "ok", message: "Backend is popping!" });
});

// Root
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend is popping!" });
});

// DB + Server Start
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
