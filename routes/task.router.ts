import express from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
  completeTask,
} from "../controller/task.controller";

const router = express.Router();

router.post("/add-task", addTask);
router.put("/update-task", updateTask);
router.delete("/delete-task/:id", deleteTask);
router.get("/get-tasks", getTasks);
router.patch("/complete-task/:id/:status", completeTask);

export default router;
