import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
  addCategory,
  getAllCategories,
  getCategory,
} from "../controllers/category.controller.js";
const router = express.Router();

router.post("/", authMiddleware, addCategory);
router.get("/:month/:year", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getCategory);

export default router;
