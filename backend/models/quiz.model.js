import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
});

const userResultSchema = new mongoose.Schema({
  // userId: { type: String, required: true }, // Ensure userId is included
  username: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  pass: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
});

export const Quiz = mongoose.model("Quiz", quizSchema);
export const UserResult = mongoose.model("UserResult", userResultSchema);