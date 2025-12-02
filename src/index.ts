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

// Allowed origins list
const allowedOrigins = [
  "http://localhost:3000",
  FRONTEND_URL,                  // Your production frontend
  /\.vercel\.app$/,              // All Vercel preview deployments
];

// CORS handler
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, Thunderclient, mobile app (no origin)
      if (!origin) return callback(null, true);

      // Check if origin matches allowed list
      const isAllowed = allowedOrigins.some((allowed) =>
        allowed instanceof RegExp
          ? allowed.test(origin)
          : allowed === origin
      );

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log(" CORS Blocked Origin:", origin);
        callback(new Error("CORS BLOCKED by server: " + origin));
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
