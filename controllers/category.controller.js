import CustomError from "../error/custom-error.js";
import userSchema from "../models/userSchema.js";
import { categorySchema, subcategorySchema } from "../models/categorySchema.js";

export const addCategory = async (req, res) => {
  const { userId } = req.user;
  const { name, color, budget, date } = req.body;

  if (!name || !color || !date) {
    throw new CustomError("please provide values", 400);
  }

  const category = await categorySchema.create({
    name,
    color,
    budget,
    date,
    user: userId,
  });

  return res.status(200).json({
    success: true,
    message: "Category added successfully",
    category,
  });
};

export const getAllCategories = async (req, res) => {
  const { userId } = req.user;
  const { month, year } = req.params;

  const categories = await categorySchema.find({
    user: userId,
    "date.month": month,
    "date.year": year,
  });

  return res.status(200).json({
    success: true,
    categories,
  });
};
