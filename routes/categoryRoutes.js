import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
  addCategory,
  getAllCategories,
} from "../controllers/category.controller.js";
const router = express.Router();

router.post("/", authMiddleware, addCategory);
router.get("/:month/:year", authMiddleware, getAllCategories);

export default router;
