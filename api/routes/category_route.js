import express from "express";
import { addCategory, deleteCategory, getCategories } from "../controllers/category.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const categoryRouter = express.Router();

categoryRouter.post("/", verifyToken, addCategory);

categoryRouter.get("/", verifyToken, getCategories);

// categoryRouter.get("/:id", verifyToken, getcategory);

categoryRouter.delete("/:id", verifyToken,deleteCategory);

export default categoryRouter;