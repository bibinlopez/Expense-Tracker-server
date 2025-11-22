import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: false,
      default: 0,
    },
    expense: {
      type: Number,
      required: false,
      default: 0,
    },
    color: {
      type: String,
      required: false,
    },
    date: {
      month: Number,
      year: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
categorySchema;
export default mongoose.model("Expense", categorySchema);
