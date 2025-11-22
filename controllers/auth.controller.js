import CustomError from "../error/custom-error.js";
import userSchema from "../models/userSchema.js";

export const auth = async (req, res) => {
  const { email, password } = req.body;

  let user = await userSchema.findOne({ email });

  let userExists;

  if (!user) {
    user = await userSchema.create({
      email,
      password,
    });
  } else {
    userExists = true;
    const isPasswordCorrect = user.password === password;

    if (!isPasswordCorrect) {
      throw new CustomError("Invalid Credentials...", 401);
    }
  }

  const token = user.createJWT();

  return res.status(200).json({
    success: true,
    message: userExists ? `Welcome to Expense Tracker !!!` : `Welcome back !!!`,
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
};
