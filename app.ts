import express from "express";
import taskRoutes from "./routes/task.router";
import cors from "cors";

export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://todo-frontend-beta-jet.vercel.app",
    ],
    credentials: true,
  })
);
app.use("/api/v1/task", taskRoutes);
