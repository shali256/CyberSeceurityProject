import express from "express";
import { addQuestion, getSubjects, getQuestions, saveUserResult, getUserResults, getAllUserResults } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/add-question", addQuestion);
router.get("/subjects", getSubjects);
router.get("/questions/:subject", getQuestions);
router.post("/save-result", saveUserResult);
router.get("/result/:username/:subject", getUserResults);
router.get("/results", getAllUserResults);


export default router;