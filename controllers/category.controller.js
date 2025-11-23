import CustomError from "../error/custom-error.js";
import userSchema from "../models/userSchema.js";
import categorySchema from "../models/categorySchema.js";

export const addCategory = async (req, res) => {
  const { userId } = req.user;
  console.log(userId);

  const { name, color, budget, date } = req.body;

  if (!name || !color || !date) {
    throw new CustomError("please provide values", 400);
  }
  const { month, year } = date;

  // checking categories for this month existing,
  const categories = await categorySchema.find({
    user: userId,
    "date.month": Number(month),
    "date.year": Number(year),
  });
  let user = await userSchema.findById(userId);

  user = user.toObject();

  console.log({ categories });

  if (categories.length > 0) {
    console.log("exists ceadfasdf");

    // exists the categories
    const category = await categorySchema.create({
      name,
      color,
      budget,
      date,
      user: userId,
    });
  } else {
    console.log("in else");

    let insertArray = [];
    if (user?.categories?.length > 0) {
      insertArray = user.categories.map((category) => {
        delete category._id;
        return { ...category, user: userId, date };
      });
    }

    insertArray.push({ name, color, budget, user: userId, date });
    console.log({ insertArray });

    const categories = await categorySchema.insertMany(insertArray);
    console.log("categories created");
  }
  const dateObj = new Date();

  if (dateObj.getMonth() + 1 === month && dateObj.getFullYear() === year) {
    await userSchema.findByIdAndUpdate(userId, {
      $push: { categories: { name, color } },
    });
    console.log("user updated with new category");
  }

  return res.status(200).json({
    success: true,
    message: "Category added successfully",
  });
};

export const getAllCategories = async (req, res) => {
  const { userId } = req.user;
  const { month, year } = req.params;

  const categories = await categorySchema.find({
    user: userId,
    "date.month": Number(month),
    "date.year": Number(year),
  });

  return res.status(200).json({
    success: true,
    categories,
  });
};
export const getCategory = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const category = await categorySchema.findOne({
    user: userId,
    _id: id,
  });

  return res.status(200).json({
    success: true,
    category,
  });
};
