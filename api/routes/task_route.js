import express from "express";
import { addTask, deleteTask, getCategoryTasks, getTask, getTasks, updateTask } from "../controllers/task.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const taskRouter = express.Router();

taskRouter.post("/", verifyToken, addTask);

taskRouter.get("/", verifyToken, getTasks);

taskRouter.get("/category/:id", verifyToken, getCategoryTasks);

taskRouter.get("/:id", verifyToken, getTask);

taskRouter.put("/:id", verifyToken, updateTask);

taskRouter.delete("/:id", verifyToken,deleteTask);

export default taskRouter;