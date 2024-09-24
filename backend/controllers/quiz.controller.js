import { Quiz, UserResult } from "../models/quiz.model.js";

export const addQuestion = async (req, res) => {
  const { subject, question, options, correctAnswer } = req.body;
  try {
    const quiz = new Quiz({ subject, question, options, correctAnswer });
    await quiz.save();
    res.status(201).json({ success: true, message: "Question added successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Quiz.distinct("subject");
    res.status(200).json(subjects);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get questions by subject
export const getQuestions = async (req, res) => {
  try {
    const { subject } = req.params;
    console.log(`Fetching questions for subject: ${subject}`);
    
    const questions = await Quiz.find({ subject });
    
    console.log("Questions retrieved:", questions);
    
    if (questions.length > 0) {
      res.status(200).json(questions);
    } else {
      res.status(404).json({ success: false, message: "No questions found for this subject." });
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Save user quiz result
// Save user quiz result
export const saveUserResult = async (req, res) => {
  const { username, subject, score, totalMarks } = req.body;

  if ( !username || !subject || score == null || totalMarks == null) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const passMarks = totalMarks * 0.5; // 50% passing criteria
  const pass = score >= passMarks;
  
  try {
    const result = new UserResult({ username, subject, score, totalMarks, pass });
    await result.save();
    res.status(201).json({ success: true, message: "Result saved successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get results for a user
export const getUserResults = async (req, res) => {
  const { username, subject } = req.params;
  try {
    const results = await UserResult.find({ username , subject });
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllUserResults = async (req, res) => {
  try {
    const results = await UserResult.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};